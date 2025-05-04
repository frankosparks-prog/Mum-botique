// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Button,
//   CircularProgress, // Import CircularProgress for loading spinner
// } from "@mui/material";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// const ViewPayments = () => {
//   const [mpesaPayments, setMpesaPayments] = useState([]);
//   const [stripePayments, setStripePayments] = useState([]);
//   const [merchantRequestId, setMerchantRequestId] = useState("");
//   const [stripeSessionId, setStripeSessionId] = useState(""); // State for Stripe sessionId search
//   const [mpesaPaymentDetails, setMpesaPaymentDetails] = useState(null);
//   const [stripePaymentDetails, setStripePaymentDetails] = useState(null); // State for Stripe payment details
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false); // Loading state for API calls

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true); // Start loading

//       try {
//         // Fetch Mpesa payments
//         const mpesaResponse = await axios.get(`${SERVER_URL}/api/mpesa/transactions`);
//         setMpesaPayments(mpesaResponse.data);

//         // Fetch Stripe payments
//         const stripeResponse = await axios.get(`${SERVER_URL}/api/webhook/payments`);
//         setStripePayments(stripeResponse.data);
//       } catch (error) {
//         console.error("Error fetching payments:", error);
//         setErrorMessage("Error fetching payments data.");
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchData();
//   }, []); // Runs once when the component is mounted

//   const handleMpesaLookup = async () => {
//     setLoading(true); // Start loading

//     try {
//       // Send GET request to fetch M-Pesa payment details based on merchantRequestId
//       const response = await axios.get(`${SERVER_URL}/api/mpesa/payment-status/${merchantRequestId}`);
//       setMpesaPaymentDetails(response.data.status); // Set payment details in state
//       setErrorMessage(""); // Clear any previous error messages
//     } catch (error) {
//       setErrorMessage("Payment not found or error fetching status.");
//       setMpesaPaymentDetails(null); // Clear any previous payment details
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   const handleStripeLookup = async () => {
//     setLoading(true); // Start loading

//     try {
//       // Send GET request to fetch Stripe payment details based on sessionId
//       const response = await axios.get(`${SERVER_URL}/api/stripe/payment-status/${stripeSessionId}`);
//       setStripePaymentDetails(response.data); // Set payment details in state
//       setErrorMessage(""); // Clear any previous error messages
//     } catch (error) {
//       setErrorMessage("Payment not found or error fetching status.");
//       setStripePaymentDetails(null); // Clear any previous payment details
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom align="center">
//         Payment Methods Overview
//       </Typography>

//       <Grid container spacing={3}>
//         {/* M-Pesa Payment Lookup */}
//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h5" gutterBottom>
//               Search M-Pesa Payment
//             </Typography>
//             <TextField
//               label="Enter Merchant Request ID"
//               variant="outlined"
//               fullWidth
//               value={merchantRequestId}
//               onChange={(e) => setMerchantRequestId(e.target.value)}
//             />
//             <Button onClick={handleMpesaLookup} variant="contained" sx={{ mt: 2 }}>
//               Get Payment Status
//             </Button>

//             {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />} {/* Loading spinner */}

//             {mpesaPaymentDetails && (
//               <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
//                 <Typography variant="h6">Payment Details</Typography>
//                 <Typography>Status: {mpesaPaymentDetails.status}</Typography>
//                 <Typography>Amount: Ksh {mpesaPaymentDetails.amount}</Typography>
//                 <Typography>Phone Number: {mpesaPaymentDetails.phoneNumber}</Typography>
//                 <Typography>Description: {mpesaPaymentDetails.description || "No description"}</Typography>
//                 <Typography>Subscription Status: {mpesaPaymentDetails.subscriptionStatus || "N/A"}</Typography> {/* Added subscription status */}
//               </Paper>
//             )}

//             {errorMessage && <Typography color="error">{errorMessage}</Typography>}
//           </Paper>
//         </Grid>

//         {/* Stripe Payment Lookup */}
//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h5" gutterBottom>
//               Search Stripe Payment by Session ID
//             </Typography>
//             <TextField
//               label="Enter Stripe Session ID"
//               variant="outlined"
//               fullWidth
//               value={stripeSessionId}
//               onChange={(e) => setStripeSessionId(e.target.value)}
//             />
//             <Button onClick={handleStripeLookup} variant="contained" sx={{ mt: 2 }}>
//               Get Payment Status
//             </Button>

//             {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />} {/* Loading spinner */}

//             {stripePaymentDetails && (
//               <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
//                 <Typography variant="h6">Payment Details</Typography>
//                 <Typography>Status: {stripePaymentDetails.paymentStatus}</Typography>
//                 <Typography>Amount: {stripePaymentDetails.amountTotal / 100} {stripePaymentDetails.currency}</Typography>
//                 <Typography>Email: {stripePaymentDetails.customerEmail || "N/A"}</Typography>
//                 <Typography>Payment Method: {stripePaymentDetails.paymentMethod || "N/A"}</Typography>
//                 <Typography>Subscription Status: {stripePaymentDetails.subscriptionStatus || "N/A"}</Typography> {/* Added subscription status */}
//               </Paper>
//             )}

//             {errorMessage && <Typography color="error">{errorMessage}</Typography>}
//           </Paper>
//         </Grid>

//         {/* Mpesa Payments View */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h5" gutterBottom>
//               Mpesa Payments
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>
//                       <strong>Phone Number</strong>
//                     </TableCell>
//                     <TableCell>
//                       <strong>Amount</strong>
//                     </TableCell>
//                     <TableCell>
//                       <strong>Status</strong>
//                     </TableCell>
//                     <TableCell>
//                       <strong>Subscription Status</strong> {/* Added Subscription Status column */}
//                     </TableCell>
//                     <TableCell>
//                       <strong>Date</strong>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {mpesaPayments.length > 0 ? (
//                     mpesaPayments.map((payment) => (
//                       <TableRow key={payment.merchantRequestId}>
//                         <TableCell>{payment.phoneNumber}</TableCell>
//                         <TableCell>{payment.amount}</TableCell>
//                         <TableCell>{payment.status}</TableCell>
//                         <TableCell>{payment.subscriptionStatus || "N/A"}</TableCell> {/* Display Subscription Status */}
//                         <TableCell>{new Date(payment.createdAt).toLocaleString()}</TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={5}>No Mpesa payments found.</TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Grid>

//         {/* Stripe Payments View */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h5" gutterBottom>
//               Stripe Payments
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>
//                       <strong>Email</strong>
//                     </TableCell>
//                     <TableCell>
//                       <strong>Amount</strong>
//                     </TableCell>
//                     <TableCell>
//                       <strong>Status</strong>
//                     </TableCell>
//                     <TableCell>
//                       <strong>Subscription Status</strong> {/* Added Subscription Status column */}
//                     </TableCell>
//                     <TableCell>
//                       <strong>Date</strong>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {stripePayments.length > 0 ? (
//                     stripePayments.map((payment) => (
//                       <TableRow key={payment.sessionId}>
//                         <TableCell>{payment.customerEmail || "N/A"}</TableCell>
//                         <TableCell>{payment.amountTotal / 100} {payment.currency}</TableCell>
//                         <TableCell>{payment.paymentStatus}</TableCell>
//                         <TableCell>{payment.subscriptionStatus || "N/A"}</TableCell> {/* Display Subscription Status */}
//                         <TableCell>{new Date(payment.createdAt).toLocaleString()}</TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={5}>No Stripe payments found.</TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ViewPayments;
import React from "react";

function ViewPayment() {
  return (
    <div className="p-8 w-full max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Coming soon....
      </h2>
    </div>
  );
}

export default ViewPayment;
