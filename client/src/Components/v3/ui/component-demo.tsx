import { Box, Stack, Grid, Typography, Button, TextField, IconButton, Card, CardHeader, CardContent, CardActions, Select, MenuItem, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, TabList, Tab, TabPanel, Tooltip, Checkbox, Switch } from './index'
import { DialogExample } from './dialog-example'
import React, { useState } from 'react'

/**
 * ComponentDemo - Demonstrates MUI → Shadcn UI compatibility
 * This component shows how existing MUI props work with our new Shadcn components
 */
export function ComponentDemo() {
  // State for interactive components
  const [selectedValue, setSelectedValue] = useState('option1')
  const [tablePage, setTablePage] = useState(0)
  const [tableRowsPerPage, setTableRowsPerPage] = useState(5)
  const [tabValue, setTabValue] = useState('tab1')
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [switchChecked, setSwitchChecked] = useState(false)
  const [tableData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'User', status: 'Inactive' },
    { id: 7, name: 'Edward Norton', email: 'edward@example.com', role: 'Admin', status: 'Active' },
  ])
  const [tableCount] = useState(7)

  const handleTablePageChange = (event: any, newPage: number) => {
    setTablePage(newPage)
  }

  const handleTableRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTableRowsPerPage(parseInt(event.target.value, 10))
    setTablePage(0)
  }
  return (
    <Box p="4" maxWidth="800px" mx="auto">
      <Typography variant="h4" gutterBottom>
        MUI → Shadcn UI Compatibility Demo
      </Typography>

      <Stack spacing="4">
        {/* Typography Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Typography Components
          </Typography>
          <Stack direction="row" spacing="2">
            <Typography variant="h1">H1 Heading</Typography>
            <Typography variant="h2">H2 Heading</Typography>
            <Typography variant="body1">Body 1 text</Typography>
            <Typography variant="body2">Body 2 text</Typography>
          </Stack>
        </Box>

        {/* Stack Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Stack Components (MUI props)
          </Typography>
          <Stack direction="row" spacing="2">
            <Button muiVariant="contained" color="primary">
              Stack Button 1
            </Button>
            <Button variant="outline">
              Stack Button 2
            </Button>
            <Button variant="ghost">
              Stack Button 3
            </Button>
          </Stack>

          <Stack direction="column" spacing="2" mt="2">
            <Typography>Vertical stack item 1</Typography>
            <Typography>Vertical stack item 2</Typography>
            <Typography>Vertical stack item 3</Typography>
          </Stack>
        </Box>

        {/* Grid Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Grid Components (MUI props)
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Box p="2" bgcolor="primary.main" color="white" borderRadius="1">
                Grid Item 1
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              <Box p="2" bgcolor="secondary.main" color="white" borderRadius="1">
                Grid Item 2
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box p="2" bgcolor="success.main" color="white" borderRadius="1">
                Grid Item 3
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Button Examples - Full MUI Compatibility */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Button Components (Full MUI Prop Compatibility)
          </Typography>

          {/* MUI contained variants */}
          <Stack direction="row" spacing="2" mb="2">
            <Button muiVariant="contained" color="primary">
              Primary
            </Button>
            <Button muiVariant="contained" color="secondary">
              Secondary
            </Button>
            <Button muiVariant="primary" color="inherit">
              Inherit
            </Button>
            <Button muiVariant="contained" disabled>
              Disabled
            </Button>
          </Stack>

          {/* MUI outlined variants */}
          <Stack direction="row" spacing="2" mb="2">
            <Button muiVariant="outlined" color="primary">
              Outlined Primary
            </Button>
            <Button muiVariant="outlined" color="secondary">
              Outlined Secondary
            </Button>
            <Button muiVariant="outlined" color="error">
              Outlined Error
            </Button>
          </Stack>

          {/* MUI text variants */}
          <Stack direction="row" spacing="2" mb="2">
            <Button muiVariant="text" color="primary">
              Text Primary
            </Button>
            <Button muiVariant="text" color="secondary">
              Text Secondary
            </Button>
            <Button muiVariant="text" color="error">
              Text Error
            </Button>
          </Stack>

          {/* Sizes */}
          <Stack direction="row" spacing="2" mb="2">
            <Button muiSize="small" muiVariant="contained">
              Small
            </Button>
            <Button muiSize="medium" muiVariant="contained">
              Medium
            </Button>
            <Button muiSize="large" muiVariant="contained">
              Large
            </Button>
          </Stack>

          {/* Loading and Icons */}
          <Stack direction="row" spacing="2" mb="2">
            <Button muiVariant="contained" loading>
              Loading
            </Button>
            <Button muiVariant="outlined" startIcon="🚀">
              With Start Icon
            </Button>
            <Button muiVariant="text" endIcon="⭐">
              With End Icon
            </Button>
          </Stack>

          {/* Full Width */}
          <Button muiVariant="contained" fullWidth>
            Full Width Button
          </Button>
        </Box>

        {/* TextField Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            TextField Components (Full MUI Prop Compatibility)
          </Typography>

          {/* Basic TextField variants */}
          <Stack direction="row" spacing="2" mb="2">
            <TextField
              label="Outlined"
              variant="outlined"
              size="small"
              placeholder="Enter text..."
            />
            <TextField
              label="Filled"
              variant="filled"
              size="small"
              placeholder="Enter text..."
            />
            <TextField
              label="Standard"
              variant="standard"
              size="small"
              placeholder="Enter text..."
            />
          </Stack>

          {/* TextField with different states */}
          <Stack direction="row" spacing="2" mb="2">
            <TextField
              label="Error State"
              variant="outlined"
              size="small"
              error
              helperText="This field is required"
            />
            <TextField
              label="Disabled"
              variant="outlined"
              size="small"
              disabled
              defaultValue="Disabled text"
            />
            <TextField
              label="Required"
              variant="outlined"
              size="small"
              required
              helperText="Required field"
            />
          </Stack>

          {/* TextField with sizes */}
          <Stack direction="column" spacing="2" mb="2">
            <TextField
              label="Small Size"
              variant="outlined"
              size="small"
              placeholder="Small input"
            />
            <TextField
              label="Medium Size"
              variant="outlined"
              size="medium"
              placeholder="Medium input"
            />
          </Stack>

          {/* TextField with custom sx styling */}
          <TextField
            label="Custom Styled"
            variant="outlined"
            size="small"
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: '#f5f5f5',
              },
              '& label.Mui-focused': {
                color: '#1976d2',
              },
            }}
            placeholder="Custom styled input"
          />
        </Box>

        {/* IconButton Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            IconButton Components (Full MUI Prop Compatibility)
          </Typography>

          {/* Basic IconButton variants */}
          <Stack direction="row" spacing="2" mb="2">
            <IconButton color="primary">
              🏠
            </IconButton>
            <IconButton color="secondary">
              ⭐
            </IconButton>
            <IconButton color="success">
              ✓
            </IconButton>
            <IconButton color="error">
              ✕
            </IconButton>
            <IconButton color="warning">
              ⚠
            </IconButton>
            <IconButton color="info">
              ℹ
            </IconButton>
          </Stack>

          {/* IconButton with different sizes */}
          <Stack direction="row" spacing="2" mb="2">
            <IconButton size="small" color="primary">
              🚀
            </IconButton>
            <IconButton size="medium" color="primary">
              🚀
            </IconButton>
            <IconButton size="large" color="primary">
              🚀
            </IconButton>
          </Stack>

          {/* IconButton with edge prop */}
          <Stack direction="row" spacing="2" mb="2">
            <IconButton edge="start" color="primary">
              ◀
            </IconButton>
            <Typography>Content with edge icons</Typography>
            <IconButton edge="end" color="primary">
              ▶
            </IconButton>
          </Stack>

          {/* IconButton states */}
          <Stack direction="row" spacing="2" mb="2">
            <IconButton color="primary">
              🎯
            </IconButton>
            <IconButton color="primary" disabled>
              🚫
            </IconButton>
            <IconButton color="inherit">
              🔄
            </IconButton>
          </Stack>
        </Box>

        {/* Card Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Card Components (Full MUI Prop Compatibility)
          </Typography>

          {/* Basic Card */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card elevation={2}>
                <CardHeader
                  title="Basic Card"
                  subheader="With header and content"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    This is a basic card example demonstrating MUI Card compatibility with elevation prop.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button muiVariant="text" color="primary">Action 1</Button>
                  <Button muiVariant="text" color="primary">Action 2</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardHeader
                  avatar={<Box w="8" h="8" bgcolor="primary.main" borderRadius="50%" />}
                  title="Outlined Card"
                  subheader="With avatar and actions"
                  action={<IconButton>⋮</IconButton>}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    This card uses the outlined variant and includes avatar and action props.
                  </Typography>
                  <Box mt="2">
                    <TextField
                      label="Input in card"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Box>
                </CardContent>
                <CardActions disableSpacing>
                  <Button muiVariant="contained" color="primary">Primary</Button>
                  <Button muiVariant="outlined" color="secondary">Secondary</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card elevation={4}>
                <CardHeader
                  title="Custom Styled Card"
                  subheader="With sx prop styling"
                  sx={{
                    borderBottom: '1px solid #e0e0e0',
                    backgroundColor: '#f8f9fa',
                  }}
                />
                <CardContent>
                  <Stack spacing="2">
                    <Typography variant="body2">
                      This card demonstrates custom styling using the sx prop.
                    </Typography>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: 1,
                        textAlign: 'center',
                      }}
                    >
                      Custom styled Box with sx prop
                    </Box>
                  </Stack>
                </CardContent>
                <CardActions>
                  <IconButton color="primary">👍</IconButton>
                  <IconButton color="secondary">💬</IconButton>
                  <IconButton color="error">❤️</IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Dialog Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Dialog Components (Full MUI Prop Compatibility)
          </Typography>
          <Box p="4" bgcolor="grey.50" borderRadius="1">
            <Typography variant="body1" paragraph>
              The following buttons demonstrate different MUI Dialog configurations with full prop compatibility:
            </Typography>
            <DialogExample />
          </Box>
        </Box>

        {/* Select Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Select Components (Full MUI Prop Compatibility)
          </Typography>

          {/* Basic Select variants */}
          <Stack direction="row" spacing="2" mb="4">
            <Box flex="1">
              <Typography variant="body2" mb="1">Basic Select</Typography>
              <Select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                label="Choose an option"
                placeholder="Select an option"
                fullWidth
              >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            </Box>

            <Box flex="1">
              <Typography variant="body2" mb="1">Small Select</Typography>
              <Select
                value="small"
                size="small"
                label="Small size"
                fullWidth
              >
                <MenuItem value="small">Small Option</MenuItem>
                <MenuItem value="small2">Small Option 2</MenuItem>
              </Select>
            </Box>

            <Box flex="1">
              <Typography variant="body2" mb="1">Error Select</Typography>
              <Select
                value="error"
                error
                label="Error state"
                helperText="This field has an error"
                fullWidth
              >
                <MenuItem value="error">Error Option</MenuItem>
                <MenuItem value="error2">Error Option 2</MenuItem>
              </Select>
            </Box>
          </Stack>

          {/* Select with variants */}
          <Stack direction="row" spacing="2" mb="2">
            <Box flex="1">
              <Typography variant="body2" mb="1">Outlined Variant</Typography>
              <Select
                variant="outlined"
                value="outlined"
                label="Outlined"
                fullWidth
              >
                <MenuItem value="outlined">Outlined Option</MenuItem>
                <MenuItem value="outlined2">Outlined Option 2</MenuItem>
              </Select>
            </Box>

            <Box flex="1">
              <Typography variant="body2" mb="1">Filled Variant</Typography>
              <Select
                variant="filled"
                value="filled"
                label="Filled"
                fullWidth
              >
                <MenuItem value="filled">Filled Option</MenuItem>
                <MenuItem value="filled2">Filled Option 2</MenuItem>
              </Select>
            </Box>

            <Box flex="1">
              <Typography variant="body2" mb="1">Standard Variant</Typography>
              <Select
                variant="standard"
                value="standard"
                label="Standard"
                fullWidth
              >
                <MenuItem value="standard">Standard Option</MenuItem>
                <MenuItem value="standard2">Standard Option 2</MenuItem>
              </Select>
            </Box>
          </Stack>
        </Box>

        {/* Table Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Table Components (Full MUI Prop Compatibility)
          </Typography>

          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData
                  .slice(tablePage * tableRowsPerPage, tablePage * tableRowsPerPage + tableRowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell align="center">
                        <Box
                          component="span"
                          sx={{
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            backgroundColor: row.role === 'Admin' ? '#e3f2fd' : '#f5f5f5',
                            color: row.role === 'Admin' ? '#1976d2' : '#666',
                          }}
                        >
                          {row.role}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          component="span"
                          sx={{
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            backgroundColor: row.status === 'Active' ? '#e8f5e8' : '#ffebee',
                            color: row.status === 'Active' ? '#2e7d32' : '#c62828',
                          }}
                        >
                          {row.status}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tableCount}
            rowsPerPage={tableRowsPerPage}
            page={tablePage}
            onPageChange={handleTablePageChange}
            onRowsPerPageChange={handleTableRowsPerPageChange}
            labelRowsPerPage="Rows per page:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
          />
        </Box>

        {/* Tab Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Tab Components (Full MUI Prop Compatibility)
          </Typography>

          <Box>
            <TabList value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
              <Tab value="tab1" label="Profile" icon="👤" />
              <Tab value="tab2" label="Settings" icon="⚙️" />
              <Tab value="tab3" label="Notifications" icon="🔔" />
            </TabList>

            <TabPanel value={tabValue} index="tab1">
              <Box p="4" bgcolor="grey.50" borderRadius="1">
                <Typography variant="h6" mb="2">Profile Tab</Typography>
                <Typography variant="body2">
                  This is the profile tab content. Users can view and edit their profile information here.
                  The tab system maintains MUI compatibility with full state management.
                </Typography>
                <Box mt="2">
                  <TextField label="Name" variant="outlined" size="small" fullWidth mb="2" />
                  <TextField label="Email" variant="outlined" size="small" fullWidth mb="2" />
                  <Button muiVariant="contained" color="primary">Save Profile</Button>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index="tab2">
              <Box p="4" bgcolor="grey.50" borderRadius="1">
                <Typography variant="h6" mb="2">Settings Tab</Typography>
                <Typography variant="body2">
                  This is the settings tab content. Users can configure application preferences,
                  notification settings, and other options.
                </Typography>
                <Stack direction="row" spacing="2" mt="2">
                  <Select label="Theme" value="light">
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="auto">Auto</MenuItem>
                  </Select>
                  <Select label="Language" value="english">
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="spanish">Spanish</MenuItem>
                    <MenuItem value="french">French</MenuItem>
                  </Select>
                </Stack>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index="tab3">
              <Box p="4" bgcolor="grey.50" borderRadius="1">
                <Typography variant="h6" mb="2">Notifications Tab</Typography>
                <Typography variant="body2">
                  This is the notifications tab content. Users can manage their notification preferences
                  and view recent notifications.
                </Typography>
                <Box mt="2">
                  <Stack spacing="2">
                    <Box p="2" border="1" borderColor="grey.300" borderRadius="1">
                      <Typography variant="body1" fontWeight="bold">New Feature Available</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Check out our new table components with full MUI compatibility!
                      </Typography>
                    </Box>
                    <Box p="2" border="1" borderColor="grey.300" borderRadius="1">
                      <Typography variant="body1" fontWeight="bold">Component Migration Update</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Successfully migrated Select, Table, and Tab components.
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </TabPanel>
          </Box>
        </Box>

        {/* Tooltip Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Tooltip Components (Full MUI Prop Compatibility)
          </Typography>

          <Stack direction="row" spacing="4" mb="4">
            <Tooltip title="This is a helpful tooltip" placement="top">
              <Button muiVariant="outlined">Hover over me</Button>
            </Tooltip>

            <Tooltip title="Tooltip with arrow" placement="bottom" arrow>
              <IconButton color="primary">💡</IconButton>
            </Tooltip>

            <Tooltip title="Different placement" placement="right">
              <Typography variant="body2">Hover this text</Typography>
            </Tooltip>

            <Tooltip title="Disabled tooltip" placement="left">
              <span>
                <Button muiVariant="contained" disabled>Disabled Button</Button>
              </span>
            </Tooltip>
          </Stack>
        </Box>

        {/* Checkbox Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Checkbox Components (Full MUI Prop Compatibility)
          </Typography>

          <Stack direction="row" spacing="4" mb="4">
            <Checkbox
              checked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}
              color="primary"
            />
            <Typography variant="body2">Primary Checkbox</Typography>

            <Checkbox color="secondary" defaultChecked />
            <Typography variant="body2">Secondary Checkbox</Typography>

            <Checkbox color="success" />
            <Typography variant="body2">Success Checkbox</Typography>

            <Checkbox color="error" />
            <Typography variant="body2">Error Checkbox</Typography>
          </Stack>

          <Stack direction="row" spacing="4" mb="4">
            <Checkbox size="small" color="primary" />
            <Typography variant="body2">Small Checkbox</Typography>

            <Checkbox size="medium" color="primary" />
            <Typography variant="body2">Medium Checkbox</Typography>

            <Checkbox disabled />
            <Typography variant="body2">Disabled Checkbox</Typography>

            <Checkbox indeterminate />
            <Typography variant="body2">Indeterminate Checkbox</Typography>
          </Stack>
        </Box>

        {/* Switch Examples */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Switch Components (Full MUI Prop Compatibility)
          </Typography>

          <Stack direction="row" spacing="4" mb="4">
            <Switch
              checked={switchChecked}
              onChange={(e) => setSwitchChecked(e.target.checked)}
              color="primary"
            />
            <Typography variant="body2">Primary Switch</Typography>

            <Switch color="secondary" defaultChecked />
            <Typography variant="body2">Secondary Switch</Typography>

            <Switch color="success" />
            <Typography variant="body2">Success Switch</Typography>

            <Switch color="error" />
            <Typography variant="body2">Error Switch</Typography>
          </Stack>

          <Stack direction="row" spacing="4" mb="4">
            <Switch size="small" color="primary" />
            <Typography variant="body2">Small Switch</Typography>

            <Switch size="medium" color="primary" />
            <Typography variant="body2">Medium Switch</Typography>

            <Switch disabled />
            <Typography variant="body2">Disabled Switch</Typography>

            <Switch disabled defaultChecked />
            <Typography variant="body2">Disabled Checked</Typography>
          </Stack>
        </Box>

        {/* Custom styling with sx prop */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Custom Styling (sx prop + CSS)
          </Typography>
          <Box
            sx={{
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              borderRadius: 3,
              border: 0,
              color: 'white',
              height: 48,
              padding: '0 30px',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            }}
          >
            Custom styled Box with sx prop
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}