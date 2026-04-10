FROM python:3.11

# Install system dependencies (THIS FIXES YOUR ERROR)
RUN apt-get update && apt-get install -y graphviz

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Expose port
EXPOSE 10000

# Run app
CMD ["gunicorn", "backend.app:app", "--bind", "0.0.0.0:10000"]