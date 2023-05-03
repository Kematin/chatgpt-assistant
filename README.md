```bash
# Clone repo
git clone https://github.com/Kematin/chatgpt-assistant.git
cd chatgpt-assistant

# Create venv, install packages
python3.10 -m venv venv
. venv/bin/activate
pip install -r requirements.txt

# Add API key
cd backend
echo "YOUR API KEY" >> key.txt

# Start backend API
python main.py
```