import React, { useState } from 'react'
import { Box, Stack, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from './index'

/**
 * DialogExample - Demonstrates MUI → Shadcn Dialog compatibility
 * This component shows how MUI Dialog props work with our new Shadcn Dialog components
 */
export function DialogExample() {
  const [openBasic, setOpenBasic] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [openFullScreen, setOpenFullScreen] = useState(false)

  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    console.log('Dialog closed with reason:', reason)
  }

  return (
    <Box>
      {/* Basic Dialog Examples */}
      <Stack direction="row" spacing="2" mb="4">
        <Button
          muiVariant="contained"
          color="primary"
          onClick={() => setOpenBasic(true)}
        >
          Basic Dialog
        </Button>
        <Button
          muiVariant="contained"
          color="secondary"
          onClick={() => setOpenForm(true)}
        >
          Form Dialog
        </Button>
        <Button
          muiVariant="contained"
          color="error"
          onClick={() => setOpenConfirmation(true)}
        >
          Confirmation Dialog
        </Button>
        <Button
          muiVariant="contained"
          color="success"
          onClick={() => setOpenFullScreen(true)}
        >
          Full Screen Dialog
        </Button>
      </Stack>

      {/* Basic Dialog */}
      <Dialog
        open={openBasic}
        onClose={(event, reason) => {
          handleClose(event, reason)
          setOpenBasic(false)
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="basic-dialog-title">
          Basic Dialog Example
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            This is a basic dialog demonstrating MUI → Shadcn compatibility with standard props.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            The dialog uses maxWidth="sm" and fullWidth props, just like MUI Dialog.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBasic(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => setOpenBasic(false)} muiVariant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Form Dialog */}
      <Dialog
        open={openForm}
        onClose={(event, reason) => {
          handleClose(event, reason)
          setOpenForm(false)
        }}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DialogTitle id="form-dialog-title">
          Form Dialog Example
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing="3">
            <TextField
              autoFocus
              label="Email Address"
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Enter your email"
            />
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Enter your name"
            />
            <TextField
              label="Message"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
              placeholder="Type your message here..."
              helperText="Maximum 500 characters"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => setOpenForm(false)} muiVariant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmation}
        onClose={(event, reason) => {
          handleClose(event, reason)
          setOpenConfirmation(false)
        }}
        maxWidth="xs"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="confirmation-dialog-title" sx={{ pb: 2 }}>
          Confirm Action
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to perform this action? This cannot be undone.
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            Note: Backdrop clicks and escape key are disabled in this dialog.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => setOpenConfirmation(false)} muiVariant="contained" color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Full Screen Dialog */}
      <Dialog
        open={openFullScreen}
        onClose={(event, reason) => {
          handleClose(event, reason)
          setOpenFullScreen(false)
        }}
        fullScreen
        scroll="body"
      >
        <DialogTitle id="fullscreen-dialog-title" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          Full Screen Dialog
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Full Screen Content
            </Typography>
            <Typography variant="body1" paragraph>
              This is a full-screen dialog that takes up the entire viewport. It's useful for complex forms or detailed content presentation.
            </Typography>
            <Stack spacing="2">
              {[...Array(10)].map((_, index) => (
                <Box key={index} p="2" bgcolor="grey.100" borderRadius="1">
                  <Typography variant="h6">Section {index + 1}</Typography>
                  <Typography variant="body2">
                    This is some content in section {index + 1}. The dialog scrolls to accommodate all content.
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions sx={{ borderTop: 1, borderColor: 'divider', p: 2 }}>
          <Button onClick={() => setOpenFullScreen(false)} color="primary" size="large">
            Close
          </Button>
          <Button onClick={() => setOpenFullScreen(false)} muiVariant="contained" color="primary" size="large">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}