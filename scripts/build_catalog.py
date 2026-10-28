"""Build catalog.json (the searchable song list for the guest page) from DJ Phil.B's library.

Source: phillipbr/flamingo-dj -> src/data/JSON/normalized/catalog/tracks-core.json
Run by .github/workflows/sync-catalog.yml every few hours, or by hand:

    python3 scripts/build_catalog.py                 # download from GitHub
    python3 scripts/build_catalog.py path/to/tracks-core.json
"""
import json, re, sys, unicodedata, urllib.request
from datetime import datetime, timezone

SOURCE_URL = "https://raw.githubusercontent.com/phillipbr/flamingo-dj/main/src/data/JSON/normalized/catalog/tracks-core.json"
OUT = "catalog.json"

CAMELOT = {
    # minor keys -> A
    "G#m": "1A", "Abm": "1A", "D#m": "2A", "Ebm": "2A", "A#m": "3A", "Bbm": "3A", "Fm": "4A",
    "Cm": "5A", "Gm": "6A", "Dm": "7A", "Am": "8A", "Em": "9A", "Bm": "10A", "F#m": "11A", "Gbm": "11A",
    "C#m": "12A", "Dbm": "12A",
    # major keys -> B
    "B": "1B", "F#": "2B", "Gb": "2B", "C#": "3B", "Db": "3B", "G#": "4B", "Ab": "4B", "D#": "5B", "Eb": "5B",
    "A#": "6B", "Bb": "6B", "F": "7B", "C": "8B", "G": "9B", "D": "10B", "A": "11B", "E": "12B",
}

def norm(s):
    s = unicodedata.normalize("NFD", (s or "").lower()).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]", "", s)

def load(argv):
    if len(argv) > 1:
        with open(argv[1], encoding="utf-8") as f:
            return json.load(f)
    with urllib.request.urlopen(SOURCE_URL, timeout=60) as r:
        return json.load(r)

def num(v):
    try: return float(v)
    except (TypeError, ValueError): return None

def main(argv):
    data = load(argv)
    tracks = data["tracks"].values() if isinstance(data["tracks"], dict) else data["tracks"]
    best = {}
    for t in tracks:
        title, artist = (t.get("title") or "").strip(), (t.get("artist") or "").strip()
        if not title:
            continue
        key = norm(title) + "|" + norm(artist)
        pop = int(num(t.get("spotifyPopularity")) or 0)
        if key in best and best[key][6] >= pop:      # keep the most popular copy of a duplicate
            continue
        bpm = num(t.get("tempo"))
        energy = num(t.get("energy"))
        best[key] = [
            str(t.get("id") or t.get("externalSongId") or ""),
            title,
            artist,
            int(round(bpm)) if bpm else 0,
            CAMELOT.get((t.get("musicalKey") or "").strip(), ""),
            int(round(energy)) if energy else 0,
            pop,
        ]
    rows = sorted(best.values(), key=lambda r: (-r[6], r[1].lower()))
    out = {
        "source": "phillipbr/flamingo-dj",
        "sourceUpdatedAt": data.get("updatedAt"),
        "builtAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "count": len(rows),
        "fields": ["id", "title", "artist", "bpm", "camelot", "energy", "popularity"],
        "tracks": rows,
    }
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
    print(f"catalog.json: {len(rows)} tracks (from {len(data['tracks'])} in source)")

if __name__ == "__main__":
    main(sys.argv)
