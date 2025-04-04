
import { AppProvider, Page, Layout, Grid, Card, Text, Button, Tabs, IndexTable, TextField, Select } from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';
import { useState, useCallback } from "react";

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
          {selectedTab === 0 && (
            <Layout>
              <Layout.Section>
                <Grid columns={{ sm: 2, md: 3, lg: 3 }} gap={{ xs: '4', sm: '4' }}>
                  <MetricCard title="Referral Sales" value="$78,040" />
                  <MetricCard title="Referral Orders" value="382" />
                  <MetricCard title="Discounts Used" value="$6,049" />
                  <MetricCard title="Store Credit Issued" value="$7,383" />
                  <MetricCard title="Referrals Commission" value="$849" />
                  <MetricCard title="Link Shares" value="12,589" />
                  <MetricCard title="Link Clicks" value="7,654" />
                  <MetricCard title="Copy Code Clicks" value="3,505" />
                  <MetricCard title="Store Visits" value="140" />
                  <MetricCard title="WhatsApp Sent" value="16,404" />
                  <MetricCard title="WhatsApp Read" value="14,501" />
                  <MetricCard title="WhatsApp Cost" value="$230" />
                  <MetricCard title="Emails Sent" value="17,864" />
                  <MetricCard title="Emails Delivered" value="14,930" />
                  <MetricCard title="Emails Opened" value="9,982" />
                </Grid>
              </Layout.Section>
            </Layout>
          )}

          {selectedTab === 1 && (
            <Layout>
              <Layout.Section>
                <Card title="Create New Campaign" sectioned>
                  <div style={{ marginBottom: '1rem' }}>
                    <TextField label="Campaign Name" value={campaignName} onChange={setCampaignName} autoComplete="off" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <Select
                      label="Reward Type"
                      options={[
                        { label: "Discount", value: "discount" },
                        { label: "Cashback", value: "cashback" },
                        { label: "Free Product", value: "free_product" }
                      ]}
                      onChange={setRewardType}
                      value={rewardType}
                    />
                  </div>
                  <Button primary>Create Campaign</Button>
                </Card>
              </Layout.Section>
            </Layout>
          )}

          {selectedTab === 2 && (
            <Layout>
              <Layout.Section>
                <Card title="Customer Referrals" sectioned>
                  <IndexTable
                    resourceName={{ singular: 'customer', plural: 'customers' }}
                    itemCount={2}
                    selectable={false}
                    headings={[
                      { title: 'Name' },
                      { title: 'Referrals' },
                      { title: 'Reward' }
                    ]}
                  >
                    <IndexTable.Row id="1" position={0}>
                      <IndexTable.Cell>Jane Doe</IndexTable.Cell>
                      <IndexTable.Cell>12</IndexTable.Cell>
                      <IndexTable.Cell>10% Discount</IndexTable.Cell>
                    </IndexTable.Row>
                    <IndexTable.Row id="2" position={1}>
                      <IndexTable.Cell>John Smith</IndexTable.Cell>
                      <IndexTable.Cell>8</IndexTable.Cell>
                      <IndexTable.Cell>Cashback</IndexTable.Cell>
                    </IndexTable.Row>
                  </IndexTable>
                </Card>
              </Layout.Section>
            </Layout>
          )}

          {selectedTab === 3 && (
            <Layout>
              <Layout.Section>
                <Card title="Settings" sectioned>
                  <div style={{ marginBottom: '1rem' }}>
                    <TextField label="WhatsApp Number" placeholder="+1234567890" autoComplete="off" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <TextField label="Sender Email" placeholder="your@email.com" autoComplete="off" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <TextField label="Default Referral Message" placeholder="Hey! Use my link to get 10% off..." multiline={3} />
                  </div>
                  <Button primary>Save Settings</Button>
                </Card>
              </Layout.Section>
            </Layout>
          )}
        </div>
      </Tabs>
    </Page>
  );
}

export default function Dashboard() {
  return (
    <AppProvider i18n={en}>
      <DashboardContent />
    </AppProvider>
  );
}
