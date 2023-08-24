import React, { useState } from 'react';
import './App.css';

const products = [
  {
    name: "Payroll",
    features: [
      "Simplifies employee payments, tax calculations, and compliance",
      "Integrates with accounting for easy payroll management",
      "Automated payroll",
      "Automated tax forms and tax filing",
      "Expert support",
      "HR tools",
      "Health Benefits",
      "401(k) plans",
      "Stays on top of compliance and makes sure that taxes and other regulations are being taken care of",
      "Sync with employee time sheets",
    ],
  },
  {
    name: "Payments",
    features: [
      "Easy acceptance of credit, debit, checks, mobile payments, and online payments.",
      "Streamlines invoicing and improves cash flow",
    ],
  },
  {
    name: "Time",
    features: [
      "Tracks employee hours and schedules",
      "Simplifies payroll and improves productivity",
      "Shows who is working",
      "Allows employees and contractors to clock in from anywhere and with geofencing can see where they were when they clocked in",
      "Tablet punch clock for simple clock-in clock out at an office",
      "Geofencing allows the ability to tie specific locations to projects and even remind employees to clock in or clock out when they leave the job site",
      "Mileage tracking",
      "Dashboard allows for creation of time schedules and employee time tracking even showing who is working where and on what project",
      "Project tracking allows for comparing budgeting hours vs actual hours",
      "Can use the app to share notes and information on each project",
      "Syncs with Payroll system including regular hours, overtime, and even PTO",
    ],
  },
  {
    name: "Commerce",
    features: [
      "Real-time tracking of inventory",
      "Ensure inventory is available to meet customer needs",
      "When inventory is sold real-time updates to the inventory",
      "Great for e-commerce",
    ],
  },
  {
    name: "Point of Sale (Desktop)",
    features: [
      "Streamlined sales processing",
      "Inventory management",
      "Customer relations",
      "Integrates with common retail hardware and even works offline",
      "Offers reports for informed decision making and smoother operations",
      "Integrates with Shopify POS",
    ],
  },
  {
    name: "Apps",
    features: [
      "Created by Intuit and third-party developers",
      "Integrates with QB for enhanced functionality",
      "Helps with specific business needs",
      "More than 450 supported apps that work with QBO",
      "Cover a wide range of topics from inventory management, time tracking, expenses, customer relationships, e-commerce, and more",
      "Allows customer to make QB their own and customize to their exact needs",
    ],
  },

];


function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleProductSelect = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleFeatureSelect = (productId, feature) => {
    setSelectedFeatures((prevSelected) => ({
      ...prevSelected,
      [productId]: prevSelected[productId]
        ? [...prevSelected[productId], feature]
        : [feature],
    }));
  };

  return (
    <div className="container">
      <header className="header">
        <h1>QuickBooks Features Selector</h1>
      </header>
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product.name}
            className={`product-item ${
              selectedProducts.includes(product.name) ? 'selected' : ''
            }`}
            onClick={() => handleProductSelect(product.name)}
          >
            <label>{product.name}</label>
            {selectedProducts.includes(product.name) && (
              <FeaturesList
                features={product.features}
                productId={product.name}
                onFeatureSelect={handleFeatureSelect}
                selectedFeatures={selectedFeatures[product.name] || []}
              />
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search features..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="search-results">
        <h2>Search Results:</h2>
        <ul>
          {products
            .filter((product) =>
              product.features.some((feature) =>
                feature.toLowerCase().includes(searchTerm.toLowerCase())
              )
            )
            .map((product) => (
              <li key={product.name}>
                <strong>{product.name}</strong>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
      <SelectedFeatures selectedFeatures={selectedFeatures} />
      <footer className="footer">
        <p>&copy; 2023 Quik's Upseller App</p>
      </footer>
    </div>
  );
    
}

function FeaturesList({ features, productId, onFeatureSelect, selectedFeatures }) {
  return (
    <ul className="features-list">
      {features.map((feature, index) => (
        <li
          key={index}
          className={selectedFeatures.includes(feature) ? 'selected' : ''}
          onClick={() => onFeatureSelect(productId, feature)}
        >
          {feature}
        </li>
      ))}
    </ul>
  );
}

function SelectedFeatures({ selectedFeatures }) {
  return (
    <div className="selected-features">
      {Object.entries(selectedFeatures).map(([productId, features]) => (
        <div key={productId} className="selected-features-item">
          <h3>{productId} Features:</h3>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
