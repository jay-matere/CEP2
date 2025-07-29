# NGO Directory Website

A minimal, fast, and mobile-friendly directory website for NGOs that allows users to search, filter, and contact local non-governmental organizations easily.

## Features

### User Features
- **Search & Filter**: Search NGOs by name, description, or address with real-time results
- **Category Filtering**: Filter by categories (Education, Health, Environment, Social Services, Animal Welfare)
- **NGO Listings**: Clean card-based layout showing key information
- **NGO Details**: Detailed pages with comprehensive organization information
- **Contact Actions**: 
  - Call Now (direct phone dialing)
  - Get Directions (Google Maps integration)
  - Email contact
  - Visit website
- **Ratings & Reviews**: Display NGO ratings and review counts
- **Mobile-Responsive**: Optimized for all device sizes

### Admin Features
- **CRUD Operations**: Add, edit, and delete NGO entries
- **Admin Dashboard**: Manage all NGO listings from a centralized panel
- **Status Management**: Activate/deactivate NGO listings
- **Data Validation**: Form validation for NGO information

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Database**: SQLite with better-sqlite3
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel, Netlify, or any Node.js hosting

## Project Structure

```
ngo-directory/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── admin/         # Admin panel
│   │   ├── ngo/[id]/      # NGO details pages
│   │   └── page.tsx       # Homepage
│   ├── components/        # React components
│   ├── lib/              # Database and utilities
│   └── globals.css       # Global styles
├── database.sqlite       # SQLite database (auto-created)
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ngo-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

The database will be automatically created and seeded with sample data on first run.

## Usage

### For End Users

1. **Browse NGOs**: Visit the homepage to see all NGOs
2. **Search**: Use the search bar to find specific organizations
3. **Filter**: Click category buttons to filter by type
4. **View Details**: Click on any NGO name to see full details
5. **Contact**: Use the action buttons to call, get directions, or email

### For Administrators

1. **Access Admin Panel**: Visit `/admin`
2. **Add NGO**: Click "Add NGO" button and fill out the form
3. **Edit NGO**: Click the edit icon next to any NGO in the admin table
4. **Delete NGO**: Click the delete icon (soft delete - marks as inactive)
5. **Manage Status**: Toggle active/inactive status in the edit form

## Database Schema

The application uses a single `ngos` table with the following structure:

- `id`: Primary key
- `name`: Organization name
- `address`: Physical address
- `phone`: Contact phone number
- `email`: Contact email (optional)
- `website`: Website URL (optional)
- `category`: Organization category
- `description`: Detailed description
- `rating`: Average rating (0-5)
- `reviewCount`: Number of reviews
- `isActive`: Status flag
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## API Endpoints

### Public APIs
- `GET /api/ngos` - Get all active NGOs (supports search and category filters)
- `GET /api/ngos/[id]` - Get specific NGO details

### Admin APIs
- `POST /api/ngos` - Create new NGO
- `PUT /api/ngos/[id]` - Update NGO
- `DELETE /api/ngos/[id]` - Soft delete NGO
- `GET /api/admin/ngos` - Get all NGOs (including inactive)

## Customization

### Adding New Categories
1. Update the `categories` array in:
   - `src/components/CategoryFilter.tsx`
   - `src/components/admin/NGOForm.tsx`

### Styling
- Modify `tailwind.config.ts` for theme changes
- Update `src/app/globals.css` for custom styles
- Component styles are inline with Tailwind classes

### Database
- Modify `src/lib/database.ts` to add new fields or tables
- Update seed data in `src/lib/seedData.ts`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Other Platforms
1. Build the application: `npm run build`
2. Upload the `.next` folder and dependencies
3. Ensure SQLite database permissions
4. Set Node.js version to 18+

## Performance Features

- **Server-Side Rendering**: Fast initial page loads
- **Database Indexing**: Optimized search queries
- **Image Optimization**: Automatic Next.js image optimization
- **Responsive Design**: Mobile-first approach
- **Minimal Bundle**: Optimized build size

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ for connecting communities with local NGOs.
