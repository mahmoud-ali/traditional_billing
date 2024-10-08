import React from "react";

import { DataTable, PaperProvider, Portal, Text, Modal } from 'react-native-paper';
import { ActivityIndicator, StyleSheet, ToastAndroid, View } from "react-native";

export function InvoiceList(props:{title:string,loading:boolean,items:Array<{invoiceId:number,name:string,quantity_in_shoal:number,amount:number}>}) {
    const [token, setToken] = React.useState('');
    // const [isPosting, setIsPosting] = React.useState(false);

    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(5);

    const [visibleModal, setVisibleModal] = React.useState(false);
    const [itemModal, setItemModal] = React.useState({invoiceId:0,name:'',quantity_in_shoal:0,amount:0});

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, props.items.length);
  
    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);  

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);  

    const showItem = React.useCallback((item:{invoiceId:number,name:string,quantity_in_shoal:number,amount:number}) => {
      setItemModal(item)
      showModal();
    },[]);
  
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
            <DataTable.Row key={item.invoiceId} onPress={()=>{showItem(item)}}>
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
        <Portal>
          <Modal visible={visibleModal} onDismiss={hideModal} contentContainerStyle={styles.modal}>
            <View>  
              <Text variant="headlineSmall" style={styles.bold_text}>تفاصيل امر التحصيل:</Text>

              <Text>
                <Text style={styles.bold_text}>رقم الامر: </Text>
                <Text style={styles.normal_text}>{itemModal.invoiceId}</Text>
              </Text>
              <Text>
                <Text style={styles.bold_text}>اسم المعدن: </Text>
                <Text style={styles.normal_text}>{itemModal.name}</Text>
              </Text>
              <Text>
                <Text style={styles.bold_text}>عدد الشوالات: </Text>
                <Text style={styles.normal_text}>{itemModal.quantity_in_shoal}</Text>
              </Text>
              <Text>
                <Text style={styles.bold_text}>المبلغ: </Text>
                <Text style={styles.normal_text}>{itemModal.amount}</Text>
              </Text>
            </View>
          </Modal>
        </Portal>
        </>
      ))
    );
  }
  
  const styles = StyleSheet.create({
    modal: {
      backgroundColor:'white',
      padding: 20,
      margin: 10,
      // alignSelf:"center",
      color: '#333'

    },
    bold_text: {
      color: '#333',
      fontWeight:"bold"
    },
    normal_text: {
      color: '#333',
    }
  });
