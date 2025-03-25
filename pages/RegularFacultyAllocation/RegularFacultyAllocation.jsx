import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SubjectList from '../../components/SubjectList/SubjectList';
import InternalList from '../../components/InternalList/InternalList';
import History from '../../components/History/History';
import Spinner from '../../components/Spinner/Spinner';
import { fetchAnotherData } from '../../redux/slice/anotherDataSlice';
import { fetchData } from '../../redux/slice/dataSlice';

const RegularFacultyAllocation = () => {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const { loading: loading1, data: data1, error: error1 } = useSelector((state) => state.data);
  const { loading: loading2, data: data2, error: error2 } = useSelector((state) => state.anotherData);

  useEffect(() => {
    const API_URL1 = `http://localhost:3002/api/RegularFacultyAllocation/${classId}`;
    const API_URL2 = 'http://localhost:3002/api/InternalList';
    dispatch(fetchData(API_URL1));
    dispatch(fetchAnotherData(API_URL2));
  }, [dispatch, classId]);

  if (loading1 || loading2) {
    return <Spinner />;
  }

  if (error1 || error2) {
    return <div>Error: {error1 || error2}</div>;
  }

  return (
    <div>
      <h1>REGULAR FACULTY ALLOCATION</h1>
      <h2>{data1.className}</h2>
      <SubjectList classDetails={data1} />
      <InternalList classDetails={data1} internalDetails={data2} />
      <History />
    </div>
  );
};

export default RegularFacultyAllocation;

// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import SubjectList from '../../components/SubjectList/SubjectList';
// import InternalList from '../../components/InternalList/InternalList';
// import History from '../../components/History/History';
// import Spinner from '../../components/Spinner/Spinner';
// import { fetchAnotherData } from '../../redux/slice/anotherDataSlice';
// import { fetchData } from '../../redux/slice/dataSlice';

// const RegularFacultyAllocation = () => {
//   const { classId } = useParams();
//   const dispatch = useDispatch();

//   const myData = useSelector((state) => state.data);
//   const myAnotherData= useSelector((state) => state.anotherData);

//   //const facultyAllocated = useSelector(state => state.facultyAllocation.facultyAllocated);

//   // Fetch data on component mount
//   useEffect(() => {
//     const API_URL1 = `http://localhost:3002/api/RegularFacultyAllocation/${classId}`;
//     const API_URL2 = 'http://localhost:3002/api/InternalList';
//     dispatch(fetchData(API_URL1));
//     dispatch(fetchAnotherData(API_URL2));
//   }, [myData, classId]);

//   if (myData.loading || myAnotherData.loading) {
//     return <Spinner />;
//   }

//   if (myData.error || myAnotherData.error) {
//     return <div>Error: {myData.error || myAnotherData.error}</div>;
//   }

//   return (
//     <div>
//       <h1>REGULAR FACULTY ALLOCATION</h1>
//       <h2>{myData.data.className}</h2>
//       <SubjectList classDetails={myData.data} />
//       <InternalList classDetails={myData.data} internalDetails={myAnotherData.data} />
//       <History />
//     </div>
//   );
// };

// export default RegularFacultyAllocation;

