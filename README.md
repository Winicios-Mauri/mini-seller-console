# 🚀 Mini Seller Console

A modern and responsive console for managing sales leads and opportunities, built with React, TypeScript, and Tailwind CSS.

![Mini Seller Console](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.2.0-purple)

## ✨ Features

### 🎯 **Lead Management**
- **Complete leads list** with detailed information
- **Real-time search** by name or company
- **Advanced filters** by status and source
- **Smart sorting** by score, name, or company
- **Filter persistence** in localStorage

### ✏️ **Inline Editing**
- **Email and status editing** with real-time validation
- **Email validation** with regex
- **Loading states** and error handling
- **Optimistic updates** with automatic rollback

### 🔄 **Lead Conversion**
- **Convert to opportunities** with optional value
- **API simulation** with realistic latency
- **Failure handling** (10% chance for demonstration)
- **Visual feedback** during the process

### 📊 **Opportunities Dashboard**
- **Opportunities table** for created opportunities
- **Currency formatting** in Brazilian Real (BRL)
- **Formatted dates** in Brazilian Portuguese
- **Visual states** by opportunity stage

### 📱 **Responsive Design**
- **Mobile-first** design approach
- **Adaptive tables** for different screen sizes
- **Flexible layout** that adjusts automatically
- **Optimized experience** across all devices

## 🛠️ Technologies Used

- **React 18.2.0** - Main library
- **TypeScript 5.2.2** - Static typing
- **Tailwind CSS 3.4.3** - Styling framework
- **Vite 5.2.0** - Build tool and dev server
- **ESLint** - Linting and code quality

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd desafio
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the project in development mode**
```bash
npm run dev
```

4. **Access in browser**
```
http://localhost:5173
```

### Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── SlideOver.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   └── index.ts
│   ├── LeadFilters.tsx     # Filters and search
│   ├── LeadList.tsx        # Leads list
│   ├── LeadDetailPanel.tsx # Details panel
│   └── OpportunitiesTable.tsx # Opportunities table
├── hooks/
│   └── useLeads.ts         # Custom hook for leads
├── pages/
│   └── Dashboard.tsx       # Main page
├── App.tsx
├── main.tsx
└── index.css
```

## 🎨 Design System

### UI Components
- **Button**: Multiple variants (primary, secondary, outline, ghost, danger)
- **Input**: With validation, icons and error states
- **Select**: Dropdown with customizable options
- **Badge**: Color indicators by status
- **Card**: Container with configurable shadows and padding
- **Modal/SlideOver**: Responsive overlays
- **LoadingSpinner**: Loading indicators
- **EmptyState**: Empty states with illustrations

### Colors and States
- **Score Colors**: Green (90+), Blue (80+), Yellow (70+), Red (<70)
- **Status Badges**: Info, Warning, Success, Danger
- **Transitions**: Smooth animations on hover and focus

## 📊 Sample Data

The project includes **30 sample leads** with:
- Varied names and companies
- Different statuses (New, Contacted, Qualified)
- Multiple sources (Web, Referral, Cold Call, Trade Show)
- Varied scores (68-96) for demonstration

## 🔧 Technical Features

### Optimistic Updates
- Immediate interface updates
- Automatic rollback on failure
- 10% error chance simulation

### Local Persistence
- Filters saved in localStorage
- Preferences maintained between sessions

### Validation
- Real-time email validation with regex
- Clear error states
- Immediate visual feedback

### Responsiveness
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Horizontal scroll tables on mobile
- Adaptive layout for all devices

## 🎯 Best Practices Implemented

- **Componentization**: Reusable and modular components
- **TypeScript**: Strong typing throughout the application
- **Custom Hooks**: Business logic separated from UI
- **Error Boundaries**: Robust error handling
- **Performance**: useMemo for filter optimization
- **Accessibility**: Labels, focus states and keyboard navigation
- **SEO**: Meta tags and semantic structure

## 📱 Compatibility

- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile
- **Tablet**: iPad, Android tablets

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 👨‍💻 Author

Developed as part of a technical challenge, demonstrating skills in:
- React and TypeScript
- Design Systems
- Responsive UX/UI
- Development best practices
- State management
- Error handling

---

⭐ **If this project was helpful, consider giving it a star!**
