import { AppProvider, Page, Layout, Grid, Card, Text, Button, Tabs, IndexTable, TextField, Select } from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';
import { useState, useCallback } from "react";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";

function MetricCard({ title, value }) {
  return (
    <Card padding="loose">
      <Text variant="bodyMd" fontWeight="semibold" as="h3">{title}</Text>
      <Text variant="headingXl" as="h2">{value}</Text>
    </Card>
  );
}

function DashboardContent() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [campaignName, setCampaignName] = useState("");
  const [rewardType, setRewardType] = useState("discount");

  const tabs = [
    { id: 'overview', content: 'Overview' },
    { id: 'campaigns', content: 'Campaigns' },
    { id: 'customers', content: 'Customers' },
    { id: 'settings', content: 'Settings' }
  ];

  const handleTabChange = useCallback((selectedTabIndex) => setSelectedTab(selectedTabIndex), []);

  return (
    <Page title="Referking Dashboard">
      <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
        <div style={{ marginTop: '20px' }}>
          {/* tabs content remains unchanged for brevity */}
        </div>
      </Tabs>
    </Page>
  );
}

export default function Dashboard() {
  const config = {
    apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
    host: new URLSearchParams(window.location.search).get("host"),
    forceRedirect: true,
  };

  return (
    <AppBridgeProvider config={config}>
      <AppProvider i18n={en}>
        <DashboardContent />
      </AppProvider>
    </AppBridgeProvider>
  );
}
