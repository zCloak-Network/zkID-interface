import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import { useWallet } from '@zcloak/react-wallet';

import { ExplorerDataType, getExplorerLink } from '@zkid/app-config/getExplorerLink';
import { Ellipsis } from '@zkid/react-components';
import { useEndpoint } from '@zkid/react-hooks';
import { zkidApi } from '@zkid/service';
import { Activity, ActivityType } from '@zkid/service/types';

const Activities: React.FC = () => {
  const { account } = useWallet();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityType, setActivityType] = useState<ActivityType>();
  const endpoint = useEndpoint();

  useEffect(() => {
    if (account) {
      zkidApi.userActivities({ dataOwner: account }).then(({ data }) => setActivities(data));
    }
  }, [account]);

  const visibleActivities = useMemo(() => {
    return activities.filter((activity) =>
      !activityType ? true : activity.operateType === activityType
    );
  }, [activities, activityType]);

  return (
    <Box id="dashboard-activities" sx={{ marginY: '44px' }}>
      <h2>Activities</h2>
      <TableContainer
        component={Paper}
        elevation={6}
        sx={{ padding: '14px', borderRadius: '10px' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell
                sx={() => ({
                  '.MuiButton-root': {
                    fontSize: 'inherit',
                    fontWeight: 'inherit'
                  }
                })}
              >
                <Button
                  onClick={() => setActivityType(undefined)}
                  size="small"
                  sx={(theme) => ({
                    color: activityType === undefined ? 'inherit' : theme.palette.grey[400]
                  })}
                >
                  All
                </Button>
                <Button
                  onClick={() => setActivityType(ActivityType.ClaimPOAP)}
                  size="small"
                  sx={(theme) => ({
                    color:
                      activityType === ActivityType.ClaimPOAP ? 'inherit' : theme.palette.grey[400]
                  })}
                >
                  Claim
                </Button>
                <Button
                  onClick={() => setActivityType(ActivityType.AddProof)}
                  size="small"
                  sx={(theme) => ({
                    color:
                      activityType === ActivityType.AddProof ? 'inherit' : theme.palette.grey[400]
                  })}
                >
                  Add proof
                </Button>
              </TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleActivities.map((activity, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{activity.operateType}</TableCell>
                <TableCell>
                  <Ellipsis width="400px">
                    {endpoint && (
                      <Link
                        href={getExplorerLink(
                          endpoint.explorer,
                          activity.transactionHash,
                          ExplorerDataType.TRANSACTION
                        )}
                        target="_blank"
                      >
                        {getExplorerLink(
                          endpoint.explorer,
                          activity.transactionHash,
                          ExplorerDataType.TRANSACTION
                        )}
                      </Link>
                    )}
                  </Ellipsis>
                </TableCell>
                <TableCell
                  sx={(theme) => ({
                    color: theme.palette.grey[700]
                  })}
                >
                  {activity.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default React.memo(Activities);
