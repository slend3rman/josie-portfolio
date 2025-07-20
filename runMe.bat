@echo off
echo Building Docker image...
docker build --no-cache -t react-vite-app .

echo Running Docker container...
docker run -p 5173:5173 react-vite-app

pause