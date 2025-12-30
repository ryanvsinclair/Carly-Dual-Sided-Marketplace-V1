import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-medium">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage Carly platform operations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Dealers</CardTitle>
            <CardDescription>Active dealer accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-medium">—</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Listings</CardTitle>
            <CardDescription>Active vehicle listings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-medium">—</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Registered buyers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-medium">—</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Placeholder page for Carly employees</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is a placeholder. No authentication or functionality implemented yet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
