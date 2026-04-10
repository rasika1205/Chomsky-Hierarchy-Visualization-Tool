FROM python:3.11

# Install node
RUN apt-get update && apt-get install -y nodejs npm

WORKDIR /app

# Copy everything
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Back to backend
WORKDIR /app

# Install backend deps
RUN pip install --no-cache-dir -r backend/requirements.txt

# Run app
CMD ["gunicorn", "backend.app:app", "--bind", "0.0.0.0:10000"]