import React from 'react';
import TabItem from '../ListItem';

import Box from '@mui/material/Box';
import TabsHeader from '@mui/material/Tabs'
import Tab from '@mui/material/Tab';


type ListItem = {
    id: number,
    task: string,
    isDone: boolean
};

type Props = {
    list: ListItem[];
};

function Tabs ({ list }: Props){
    const [value, setValue] = React.useState(0);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };

    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      };

    return <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabsHeader value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Item One" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                    </TabsHeader>
                </Box>
                <Box>
                    {
                        list.map(({id, task, isDone}, i) => {
                            let index: number = 0;
                            if(value) index = isDone ? 2 : 1;

                            return (
                                <TabItem key={id} value={value} index={index}>
                                    {task}
                                </TabItem>
                            )}
                        )
                    }
                </Box>
        </Box>;
};

export default Tabs;