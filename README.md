# Pokemon Data Explorer

A modern, interactive web application for exploring Pokemon data using the PokeAPI. Browse through Pokemon, filter by type, search by name, and view detailed information about each Pokemon.

## Features

- **Pokemon List View**: Browse paginated Pokemon data with sprites and type information.

- **Search Functionality**: Search Pokemon by name with real-time filtering.

- **Type Filtering**: Filter Pokemon by their elemental types.

- **Detailed View**: Click on any Pokemon to see detailed information.

## Tech Stack

- **React 19.2.0** - UI framework

- **TypeScript** - Type safety

- **React Router v7** - Client-side routing

- **TanStack Query (React Query)** - Data fetching and caching

- **TanStack Table** - Table management

- **Tailwind CSS** - Styling

- **DaisyUI** - UI component library

- **Vite** - Build tool and dev server

## Prerequisites

- Node.js (v16 or higher recommended)

- npm or yarn package manager

## Setup Instructions

1.  **Clone the repository**

```bash

git clone https://github.com/nastisha29/Pokemon-Data-Explorer.git

```

2.  **Install dependencies**

```bash

npm install

```

3.  **Start the development server**

```bash

npm run dev

```

4.  **Open the application**

- The app will be available at `http://localhost:5173` (or another port if 5173 is taken)

- The dev server will automatically open your browser

## API Usage

This application uses the [PokeAPI](https://pokeapi.co/) - a free, open RESTful API for Pokemon data.

### Endpoints Used:

- `GET /pokemon` - List Pokemon with pagination

- `GET /pokemon/{id}` - Get Pokemon details by ID

- `GET /pokemon/{name}` - Get Pokemon details by name

- `GET /type` - List all Pokemon types

- `GET /type/{name}` - Get Pokemon by type

## Assumptions Made

1.  **API Availability**: The PokeAPI service is assumed to be available and stable. No offline fallback is implemented.

2.  **Data Volume**: The application loads up to 10,000 Pokemon names for search functionality, assuming this is within acceptable memory limits for modern browsers.

3.  **Pagination**: Default page size is 20 Pokemon per page. This provides a good balance between data loading and user experience.

4.  **Image Availability**: Pokemon sprites and official artwork are assumed to be available from the API. Fallback to front_default sprite if official artwork is missing.

5.  **Search Behavior**:

- Search is case-insensitive and matches partial names

- Search results are limited to 100 matches for performance

- Both search and type filters can be active simultaneously

6.  **Caching Strategy**:

- Pokemon data is cached for 1 hour (staleTime)

- Pokemon list data is cached for 7 days

- All Pokemon names are cached for 30 days

## License

This project was created as part of a technical assessment for an interview. Pokemon and Pokemon character names are trademarks of Nintendo.
