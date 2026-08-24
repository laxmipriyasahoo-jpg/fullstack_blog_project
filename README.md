# Full Stack Blog Application

A responsive full-stack blog application built with React and Django REST Framework.

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- React Toastify

### Backend
- Python
- Django
- Django REST Framework
- Simple JWT
- SQLite

## Features

- User registration
- JWT login/logout
- Protected routes
- Create blog posts
- View all blog posts
- View blog details
- Update own posts
- Delete own posts
- User-specific dashboard
- Responsive UI
- API error handling
- Toast notifications
- Mobile navigation
- Admin panel

## Project Structure

```text
fullstack-blog-app/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── blogproject/
│   └── blogs/
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
```

## Run Backend

```bash
cd backend
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Install packages:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Backend:
`http://127.0.0.1:8000`

## Run Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:
`http://localhost:5173`

## API Endpoints

```text
POST   /api/register/
POST   /api/token/
POST   /api/token/refresh/
GET    /api/blogs/
POST   /api/blogs/
GET    /api/blogs/<id>/
PUT    /api/blogs/<id>/
DELETE /api/blogs/<id>/
GET    /api/my-blogs/
```

## Deployment

### Backend - Render

Build command:

```bash
pip install -r requirements.txt && python manage.py migrate
```

Start command:

```bash
gunicorn blogproject.wsgi:application
```

Set environment variable:

```text
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=<your-secret-key>
```

For production, configure a PostgreSQL database and set `DATABASE_URL` according to your hosting provider.

### Frontend - Vercel / Netlify

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Set:

```text
VITE_API_URL=https://your-backend-domain.com/api
```

## Important

Before production deployment:
1. Change the Django secret key.
2. Set `DEBUG=False`.
3. Add your frontend domain to CORS.
4. Use HTTPS.
5. Use PostgreSQL instead of SQLite for production.
6. Run migrations.
