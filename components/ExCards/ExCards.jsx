
import {useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchData } from '../../redux/slice/dataSlice';
import ExCard from '../ExCard/ExCard';
import Spinner from '../Spinner/Spinner';

const ExCards = ({selected}) => {

  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.data);

  useEffect(() => {
    const API_URL = 'http://localhost:3002/api/ExClassList';
    dispatch(fetchData(API_URL));
  }, [dispatch]);

  //   console.log(JSON.stringify(data, null, 2));

  if (!Array.isArray(data)) {
    console.error('Data is not an array:', data);
    return null; // or return a fallback UI
  }

  const groupedDataByYear = data.reduce((acc, item) => {
    const yearGroup = acc.find((group) => group[0]?.year === item.year);
    if (yearGroup) {
      yearGroup.push(item);
    } else {
      acc.push([item]);
    }
    return acc;
  }, []);
  console.log('groupedDataByYear');
  console.log(groupedDataByYear);

  return (
    <div>
    
      <div>
        {
          loading?
            (
              <div>
                <Spinner/>
              </div>
            ):
            (
              <div>
                {
                  groupedDataByYear.map((yearData,index)=>{
                    return <ExCard yearData={ yearData } key={ index } selected={ selected } />;
                  }) 
                }
              </div>
            )
        }
      </div>

    </div>
  );
};

export default ExCards;
