import os
import random

from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv("../.env")

url: str = os.environ.get("VITE_SUPABASE_URL")
key: str = os.environ.get("VITE_SUPABASE_KEY")
supabase: Client = create_client(url, key)

table_count = supabase.table("users").select("id", count="exact").execute()

random_index: int = random.randint(0, table_count.count - 1)

random_user = supabase.table("users").select("id").range(random_index, random_index).execute()

user_id: int = random_user.data[0].get("id")

print(user_id)
