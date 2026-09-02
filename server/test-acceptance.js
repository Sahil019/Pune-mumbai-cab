// Automated Acceptance Test Script for Pune ↔ Mumbai Cab Booking & CMS
// Validates CMS -> Database -> API -> Public Pricing and Enquiry Lifecycle

import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

async function runAcceptanceTests() {
  console.log('=== RUNNING EXACT ACCEPTANCE TESTS ===\n');

  try {
    // TEST 1: Get Pune to Mumbai route details & verify Sedan initial price (₹2,999)
    console.log('--- TEST 1: Fetching Pune -> Mumbai Cab Route Pricing ---');
    const route1Res = await axios.get(`${API_BASE}/routes/pune-to-mumbai-cab`);
    if (!route1Res.data.success) throw new Error('Failed to fetch route');
    
    const route1Data = route1Res.data.data;
    const sedanPricing1 = route1Data.pricing.find(p => p.vehicle.slug === 'sedan');
    console.log(`Initial Sedan One-Way Price: ₹${sedanPricing1.one_way_price}`);
    if (sedanPricing1.one_way_price !== 2999) {
      throw new Error(`Expected ₹2999, got ₹${sedanPricing1.one_way_price}`);
    }
    console.log('✅ TEST 1 PASSED: Sedan One-Way is ₹2,999\n');

    // TEST 2: Admin Login
    console.log('--- TEST 2: Admin Login ---');
    const loginRes = await axios.post(`${API_BASE}/admin/auth/login`, {
      email: 'admin@cabs.com',
      password: 'admin123'
    });
    if (!loginRes.data.success) throw new Error('Login failed');
    const token = loginRes.data.data.token;
    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };
    console.log('✅ TEST 2 PASSED: Admin authenticated successfully\n');

    // TEST 3: Admin Updates Sedan Pricing (₹2,999 -> ₹3,499)
    console.log('--- TEST 3: Admin Updates Price (₹2,999 -> ₹3,499) ---');
    const pricingId = sedanPricing1.id;
    const updateRes = await axios.put(
      `${API_BASE}/admin/pricing/${pricingId}`,
      { one_way_price: 3499, round_trip_price: 5999 },
      authHeaders
    );
    if (!updateRes.data.success) throw new Error('Pricing update failed');
    console.log(`Updated Pricing Response: ₹${updateRes.data.data.one_way_price}`);
    console.log('✅ TEST 3 PASSED: Price updated in database\n');

    // TEST 4: Public Route Page Verification (Verify ₹3,499)
    console.log('--- TEST 4: Verifying Updated Price on Public API ---');
    const route2Res = await axios.get(`${API_BASE}/routes/pune-to-mumbai-cab`);
    const sedanPricing2 = route2Res.data.data.pricing.find(p => p.vehicle.slug === 'sedan');
    console.log(`Public Website Sedan One-Way Price: ₹${sedanPricing2.one_way_price}`);
    if (sedanPricing2.one_way_price !== 3499) {
      throw new Error(`Expected ₹3499 on public site, got ₹${sedanPricing2.one_way_price}`);
    }
    console.log('✅ TEST 4 PASSED: Public route page reflects updated ₹3,499 price!\n');

    // TEST 5: Submit Booking Enquiry
    console.log('--- TEST 5: Submitting Customer Booking Enquiry ---');
    const enquiryRes = await axios.post(`${API_BASE}/enquiries`, {
      name: 'Ananya Sharma',
      mobile_number: '9822012345',
      email: 'ananya@example.com',
      pickup_location: 'Baner, Pune',
      drop_location: 'Mumbai Airport Terminal 2',
      travel_date: '2026-09-10',
      travel_time: '06:30 AM',
      trip_type: 'One Way',
      vehicle_id: sedanPricing1.vehicle_id,
      number_of_passengers: 3,
      message: 'Urgent early morning flight pickup.'
    });
    if (!enquiryRes.data.success) throw new Error('Enquiry submission failed');
    const createdEnquiryId = enquiryRes.data.data.id;
    console.log(`Created Enquiry ID: ${createdEnquiryId}, Status: ${enquiryRes.data.data.status}`);
    console.log('✅ TEST 5 PASSED: Enquiry submitted successfully\n');

    // TEST 6: Admin Views Enquiries
    console.log('--- TEST 6: Admin Fetching Enquiries List ---');
    const enquiriesRes = await axios.get(`${API_BASE}/admin/enquiries`, authHeaders);
    const foundEnquiry = enquiriesRes.data.data.find(e => e.id === createdEnquiryId);
    if (!foundEnquiry) throw new Error('Submitted enquiry not found in admin list');
    console.log(`Found Enquiry in Admin CMS for customer: ${foundEnquiry.name}, status: ${foundEnquiry.status}`);
    console.log('✅ TEST 6 PASSED: Enquiry exists in Admin CMS\n');

    // TEST 7: Admin Changes Status (New -> Contacted)
    console.log('--- TEST 7: Admin Updating Enquiry Status (New -> Contacted) ---');
    const statusUpdateRes = await axios.put(
      `${API_BASE}/admin/enquiries/${createdEnquiryId}/status`,
      { status: 'Contacted' },
      authHeaders
    );
    if (!statusUpdateRes.data.success) throw new Error('Status update failed');
    console.log(`Updated Enquiry Status: ${statusUpdateRes.data.data.status}`);
    if (statusUpdateRes.data.data.status !== 'Contacted') {
      throw new Error(`Expected 'Contacted', got ${statusUpdateRes.data.data.status}`);
    }
    console.log('✅ TEST 7 PASSED: Enquiry status updated and persisted as Contacted!\n');

    console.log('==================================================');
    console.log('🎉 ALL 7 ACCEPTANCE TESTS PASSED WITH 100% SUCCESS!');
    console.log('==================================================');
  } catch (err) {
    console.error('❌ ACCEPTANCE TEST FAILED:', err.message);
    if (err.response) {
      console.error('Response Data:', err.response.data);
    }
    process.exit(1);
  }
}

runAcceptanceTests();
