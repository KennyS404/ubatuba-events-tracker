import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, engine, SessionLocal
from sqlalchemy.orm import sessionmaker

client = TestClient(app)

@pytest.fixture(autouse=True)
def run_around_tests():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield

def test_create_and_read_event():
    response = client.post("/events/", data={
        "title":"Test",
        "description":"Desc",
        "date":"2025-07-01T10:00:00",
        "location":"Praia",
        "category":"Test"
    })
    assert response.status_code == 200
    data = response.json()
    evt_id = data["id"]

    res2 = client.get(f"/events/{evt_id}")
    assert res2.status_code == 200
    assert res2.json()["title"] == "Test"
