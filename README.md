# Video Library Application

A full-stack TypeScript application for browsing and managing a video library, built with Next.js 14, React, and modern web technologies.

## 🚀 Tech Stack

### Frontend
- **Next.js 14** with App Router - Modern React framework with built-in routing
- **TypeScript** - Type-safe development throughout the application
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **React Hook Form** - Performant forms with easy validation
- **React Query** - Data fetching, caching, and synchronization
- **Zod** - TypeScript-first schema validation

### Backend
- **Next.js API Routes** - Serverless API endpoints built on Node.js
- **JSON File Storage** - Simple file-based data persistence
- **Zod Validation** - Runtime type checking and API validation

### Testing & Quality
- **Jest** - JavaScript testing framework
- **React Testing Library** - React component testing utilities
- **TypeScript** - Compile-time type checking
- **ESLint** - Code linting and style enforcement

## 📋 Features

### Video Library
- **Grid Layout** - Responsive video grid with clean card design
- **Sorting** - Sort videos by creation date (newest/oldest first)
- **Rich Metadata** - Display title, creation date, tags, views, and duration
- **Thumbnail Support** - Video thumbnails with duration overlay

### Video Creation
- **Form Validation** - Client and server-side validation with helpful error messages
- **Tag Management** - Dynamic tag input with add/remove functionality
- **Smart Defaults** - Automatic placeholder values for optional fields
- **Error Handling** - Comprehensive error states and user feedback

### User Experience
- **Loading States** - Smooth loading indicators for all async operations
- **Error Boundaries** - Graceful error handling with retry options
- **Responsive Design** - Mobile-first design that works on all devices
- **Accessibility** - Semantic HTML and proper ARIA labels

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd video-library
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run test     # Run tests
npm run test:watch # Run tests in watch mode
```

## 🏗️ Project Structure

```
video-library/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/videos/         # API endpoints
│   │   ├── create/             # Create video page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── providers.tsx       # React Query provider
│   ├── components/             # Reusable UI components
│   │   ├── error-message.tsx   # Error state component
│   │   ├── loading-spinner.tsx # Loading state component
│   │   ├── sort-controls.tsx   # Video sorting controls
│   │   ├── tag-input.tsx       # Dynamic tag input
│   │   ├── video-card.tsx      # Video display card
│   │   ├── video-form.tsx      # Video creation form
│   │   └── video-grid.tsx      # Video grid layout
│   ├── hooks/                  # Custom React hooks
│   │   └── use-videos.ts       # Video data management
│   ├── lib/                    # Utilities and services
│   │   ├── api-client.ts       # Frontend API client
│   │   ├── schemas.ts          # Zod schemas and types
│   │   ├── utils.ts            # Helper functions
│   │   └── video-service.ts    # Backend video service
│   └── __tests__/              # Test files
├── data/
│   └── videos.json             # Video data storage
├── public/                     # Static assets
└── [config files]              # TypeScript, Tailwind, Jest configs
```

## 🧪 Testing Strategy

The application includes focused testing on critical functionality:

### API Testing
- Endpoint validation and error handling
- Request/response data validation
- Error state handling

### Component Testing
- User interactions and form validation
- Data display and formatting
- Loading and error states

### Utility Testing
- Data formatting functions
- Helper utilities

Run tests with:
```bash
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
```

## 🔄 API Documentation

### GET /api/videos
Retrieve all videos with optional sorting.

**Query Parameters:**
- `sort` (optional): `created_at_asc` | `created_at_desc`

**Response:**
```typescript
{
  success: true,
  data: Video[]
}
```

### POST /api/videos
Create a new video.

**Request Body:**
```typescript
{
  title: string,              // Required
  tags?: string[],           // Optional
  thumbnail_url?: string,    // Optional, must be valid URL
  created_at?: string,       // Optional, defaults to now
  duration?: number,         // Optional, defaults to 1200
  views?: number            // Optional, defaults to 0
}
```

**Response:**
```typescript
{
  success: true,
  data: Video
}
```

## 🚀 Future Improvements

### Performance & Scalability
- **Database Integration** - Replace JSON file storage with PostgreSQL or MongoDB for better performance and concurrent access
- **Pagination** - Implement pagination for large video collections
- **Caching** - Add Redis caching layer for frequently accessed data
- **CDN Integration** - Serve thumbnails and static assets from a CDN

### Enhanced Features
- **Video Upload** - Direct video file upload with encoding pipeline
- **Advanced Search** - Full-text search across titles, descriptions, and tags
- **Filtering** - Filter videos by tags, duration, view count, and date ranges
- **Video Player** - Integrated video player with playback controls
- **User Authentication** - User accounts with personalized libraries
- **Playlists** - Create and manage custom video playlists

### Developer Experience
- **Comprehensive Testing** - Increase test coverage to 90%+ with integration and e2e tests
- **CI/CD Pipeline** - Automated testing, building, and deployment
- **Monitoring** - Application performance monitoring and error tracking
- **Documentation** - Interactive API documentation with Swagger/OpenAPI
- **Code Quality** - Additional linting rules and automated code formatting

### User Experience
- **Dark Mode** - Toggle between light and dark themes
- **Keyboard Navigation** - Full keyboard accessibility support
- **Drag & Drop** - Drag and drop video organization
- **Bulk Operations** - Select and manage multiple videos at once
- **Video Analytics** - Track video performance and engagement metrics

### Technical Improvements
- **Server-Side Rendering** - Optimize SEO and initial page load times
- **Real-time Updates** - WebSocket support for live data updates
- **Offline Support** - Progressive Web App with offline functionality
- **Performance Optimization** - Image optimization, lazy loading, and code splitting
- **Security Hardening** - Rate limiting, input sanitization, and security headers

## 📝 Architecture Decisions

### Why Next.js with App Router?
- **Full-stack in one project** - Simplified development and deployment
- **Type safety** - Excellent TypeScript support throughout
- **Modern React patterns** - Server components and app directory structure
- **Built-in optimizations** - Image optimization, bundle splitting, and more

### Why JSON File Storage?
- **Simplicity** - No database setup required for this demonstration
- **Portability** - Easy to understand and modify
- **Version Control** - Data changes are trackable in git

### Why React Query?
- **Caching** - Intelligent data caching and synchronization
- **Loading States** - Built-in loading and error state management
- **Optimistic Updates** - Better user experience with instant feedback

### Why Zod?
- **Type Safety** - Runtime validation that matches TypeScript types
- **Reusability** - Same schemas work for frontend and backend validation
- **Developer Experience** - Clear error messages and excellent TypeScript integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify as needed.
