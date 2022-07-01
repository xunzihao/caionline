import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import * as serviceKit from '../services'
import { useQuery } from 'react-query'
const Courses = () => {
  const {
    isLoading,
    isFetching,
    isError,
    data
  } = useQuery(['serviceKit.courseServices.getAllUseQuery', {}], serviceKit.courseServices.getAllUseQuery)
  return (
    <>
      <Head>
        <title>
          Customers | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={!isFetching ? data?.data ? data.data : [] : []} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
Courses.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Courses;
