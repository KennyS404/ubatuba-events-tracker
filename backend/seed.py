import json
from datetime import datetime
from app.database import SessionLocal, engine, Base
from app.models import Event

def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    data = json.load(open('sample_events.json'))
    for item in data:
        e = Event(
            title=item['title'],
            description=item['description'],
            date=datetime.fromisoformat(item['date']),
            location=item['location'],
            category=item.get('category')
        )
        db.add(e)
    db.commit()
    db.close()

if __name__ == "__main__":
    seed()
