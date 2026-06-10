# Run Application Tutorial

This tutorial explains how to run the photobooth application from start to finish.
The project has two main folders:
- `photobooth-api` — Laravel backend
- `photobooth-client` — Vue frontend

## Prerequisites

Make sure the following software is installed:
- PHP 8.3 or later
- Composer
- Node.js 20.x or newer (or >= 22.12.0)
- npm
- Git (optional, if you clone the repository)

## 1. Prepare the backend (`photobooth-api`)

Open a terminal and navigate to the backend folder:

```powershell
cd C:\ApplicationClient\photobooth-api
```

Install PHP dependencies:

```powershell
composer install
```

Create the environment file if it does not exist:

```powershell
Copy-Item .env.example .env -ErrorAction SilentlyContinue
```

Generate the application key:

```powershell
php artisan key:generate
```

### Database setup

If you want to use SQLite (quick local setup):

```powershell
New-Item -ItemType File -Path database\database.sqlite -Force
```

Then edit `photobooth-api\.env` and set:

```text
DB_CONNECTION=sqlite
DB_DATABASE=${PWD}\\database\\database.sqlite
```

If you want to use MySQL/MariaDB, update the DB values in `photobooth-api\.env` and import the SQL file if required:

```powershell
# Import into MySQL if needed
mysql -u username -p database_name < ..\db_photobooth.sql
```

Run database migrations:

```powershell
php artisan migrate --force
```

If the project needs seed data, run any available seeders after migration.

## 2. Prepare the frontend (`photobooth-client`)

Open a second terminal and go to the client folder:

```powershell
cd C:\ApplicationClient\photobooth-client
```

Install npm dependencies:

```powershell
npm install
```

## 3. Run the application

### Start the backend server

From `photobooth-api`:

```powershell
php artisan serve
```

This usually starts the backend at:

```text
http://127.0.0.1:8000
```

### Start the frontend development server

From `photobooth-client`:

```powershell
npm run dev
```

Vite typically starts the client at:

```text
http://127.0.0.1:5173
```

## 4. Access the app

Open the URL from the frontend terminal in your browser, usually:

```text
http://127.0.0.1:5173
```

The app should now follow this flow:

1. Welcome
2. Package
3. Email
4. Frame
5. Summary
6. Payment Method
7. QRIS Payment
8. Camera
9. Preview
10. Success

## 5. Optional commands

### Run backend in dev mode with queue and Vite

From `photobooth-api` you can use the Laravel dev script if the environment supports it:

```powershell
npm run dev
```

### Build production frontend

From `photobooth-client`:

```powershell
npm run build
```

### Run backend tests

From `photobooth-api`:

```powershell
composer test
```

## Notes

- If you use different ports, update the frontend API base URL in `photobooth-client/src/services/api.js` if needed.
- If you encounter CORS or API endpoint issues, verify the backend base URL and `.env` settings.
- Keep one terminal running the backend and another running the frontend for local development.
