import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Bar from '../../Graphs/Bar/Bar';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Tooltip } from '@mui/material/';

export default function AllPortfolio({ investAMt }) {
  //no of tabs
  const [tabs, setTabs] = React.useState([{ label: 'Portfolio 1', content: <Bar investAMt={investAMt} /> }]);

  //index values of tabs
  const [value, setValue] = React.useState(0);

  //switching tabs newValue is index value
  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };

  //add tab limit 5
  const addTab = () => {
    if (value >= 4) {
      return
    }
    const newTabs = [...tabs];
    const newLabel = `Portfolio ${newTabs.length + 1}`;
    const newContent = <Bar investAMt={investAMt} />;
    newTabs.push({ label: newLabel, content: newContent });
    setTabs(newTabs);
    setValue(newTabs.length - 1);
  };

  //delete a tab
  const deleteTab = (index) => {
    const newTabs = [...tabs];
    console.log(newTabs)
    newTabs.splice(index, 1);
    setTabs(newTabs);
    setValue(newTabs.length - 1);
  };

  //delete button not show on 1 tab
  const renderDeleteButton = (index) => {
    if (tabs.length > 1 && index === value) {
      return (
        <DeleteIcon onClick={() => deleteTab(index)} sx={{ marginLeft: '20px' }} />
      );
    }
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Tabs value={value} onChange={handleChange}>
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>

        <Tooltip title="Add">
          <AddCircleIcon onClick={addTab} sx={{ marginLeft: '20px' }}>Add Portfolio</AddCircleIcon>
        </Tooltip>

        {renderDeleteButton(value) && (
          <Tooltip title="Delete">
            {renderDeleteButton(value)}
          </Tooltip>
        )}
      </Box>

      {tabs.map((tab, index) => (
        <div key={index} style={{ display: index === value ? 'block' : 'none', marginTop: '20px' }}>
          {tab.content}
        </div>
      ))}
    </Box>
  );
}
