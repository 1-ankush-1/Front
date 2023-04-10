import { Skeleton } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';

const Pie = ({ data }) => {

  return (
    <>
    {console.log()}
      {!!data[0]?.value   ?
        <div style={{ width: "200px", height: "200px", margin: "5px" }} >
        
          <PieChart
            data={data}
            label={({ dataEntry }) => {
              return `${Math.round(dataEntry.percentage)}% ${dataEntry.label}`;
            }}
            labelStyle={{ fontSize: '6px', fontFamily: 'sans-serif' }}
            labelPosition={60}
            paddingAngle={0}
            radius={50}
            animationDuration={2000}
            animate={true}
          />
        </div> : <>
          <Skeleton
            variant="circular"
            width={200}
            height={200}
          />
        </>}
    </>
  );
};
export default Pie;