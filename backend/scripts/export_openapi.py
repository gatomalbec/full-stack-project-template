import json
from pathlib import Path

from app.main import app


def main() -> None:
    output_path = Path(__file__).resolve().parent.parent / "openapi.json"
    schema = app.openapi()
    output_path.write_text(f"{json.dumps(schema, indent=2, sort_keys=True)}\n", encoding="utf-8")


if __name__ == "__main__":
    main()
