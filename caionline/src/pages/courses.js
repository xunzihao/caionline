import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
// import Course from '../components/ProductDemo/ProductDemo'
const Courses = () => {  
  return (
    <>
      <Head>
        <title>
          课程管理 | 在线教学辅助
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
          <Box sx={{ mt: 3 }}>
            {/* <Course/> */}
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
