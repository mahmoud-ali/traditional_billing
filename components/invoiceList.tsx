import React from "react";

import { DataTable, Text } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, ToastAndroid } from "react-native";

export function InvoiceList(props:{title:string,loading:boolean,items:Array<{invoice:number,name:string,quantity_in_shoal:number,amount:number}>}) {
    const [token, setToken] = React.useState('');
    // const [isPosting, setIsPosting] = React.useState(false);

    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(5);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, props.items.length);
  
    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);  


    return (
      (props.loading?(
        <>
          
          <Text>
            <ActivityIndicator animating={true}  />
            <Text>جاري التحميل..</Text>
          </Text>
        </>
      ):(
      <>
        <Text variant="headlineSmall">{props.title}:</Text>
        <DataTable>
            <DataTable.Header>
            <DataTable.Title>رقم الامر </DataTable.Title>
            <DataTable.Title>المعدن</DataTable.Title>
            <DataTable.Title numeric>عدد الشوالات</DataTable.Title>
            <DataTable.Title numeric>المبلغ</DataTable.Title>
            </DataTable.Header>
    
            {props.items.slice(from, to).map((item:any) => (
            <DataTable.Row key={item.invoiceId}>
                <DataTable.Cell>{item.invoiceId}</DataTable.Cell>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell numeric>{item.quantity_in_shoal}</DataTable.Cell>
                <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
            </DataTable.Row>
            ))}
    
            <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(props.items.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            />
        </DataTable>          
        </>
      ))
    );
  }
  