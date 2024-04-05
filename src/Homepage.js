import React from 'react';
import './App.css';
import EmailItem from './components/EmailItem';
import EmailBody from './components/EmailBody';
import useFetch from './hooks/useFetch';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import  Modal  from './components/Modal';

function Homepage() {
  const [selectedEmail, setSelectedEmail] = React.useState();
  const [operations, setOperations] = React.useState({ readedList: [], favorites: [] });
  const [selectedFilter, setSelectedFilter] = React.useState("");

  const { data: emailList, status: emailRequestStatus } = useFetch('https://flipkart-email-mock.now.sh', true)
  const { data: emailBody, status: emailBodyRequestStatus } = useFetch(`https://flipkart-email-mock.now.sh/?id=${selectedEmail?.id}`, selectedEmail?.id);

  const handleSelectEmail = ({ id, date, name }) => {
    setSelectedEmail({ id, date, name });

    setOperations((prevList => {
      return { ...prevList, readedList: [...prevList?.readedList, id] }
    }))
  }

  const handleMarkAsFavorite = (emailId) => {
    const isInList = operations?.favorites.includes(emailId);
    if (isInList) {
      const newList = operations?.favorites?.filter(id => id !== emailId);
      setOperations({ ...operations, favorites: newList });
    } else {
      setOperations({ ...operations, favorites: [...operations.favorites, emailId] });
    }
  }

  const handleSelectFilter = (event) => {
    const filter = event.target?.dataset?.filter;
    if (filter === selectedFilter) {
      setSelectedFilter('');
    } else if (filter) {
      setSelectedFilter(filter);
    }
  }
  if ([emailRequestStatus, emailBodyRequestStatus].includes('rejected')) {
    return <div>There's something went wrong</div>
  }

  const filteredEmailList = emailList?.list?.filter((email) => {
    if (selectedFilter === "favorites" && operations?.favorites.includes(email?.id)) return true;
    if (selectedFilter === "read" && operations?.readedList.includes(email?.id)) return true;
    if (selectedFilter === "unread" && !operations?.readedList.includes(email?.id)) return true;
    if (selectedFilter === "") return true;
    else {
      return false;
    }
  })

  return (
    <div className="App">
      <Sidebar/>
       {selectedEmail && <Modal />}
      <Header selectedFilter={selectedFilter} handleSelectFilter={handleSelectFilter} />
      <div className={`main-container ${selectedEmail?.id ? 'splitted' : ''}`}>
        <ul className='list-container'>
          {filteredEmailList?.map((emailInfo) => <EmailItem key={emailInfo?.id} emailInfo={emailInfo} handleSelectEmail={handleSelectEmail} readedList={operations?.readedList}
            favorites={operations?.favorites}
            isThisSelectedEmail={selectedEmail?.id}
          />)}
        </ul>
        {
          emailBody && selectedEmail?.id ?
            <div className='selected-email-body'>
              <EmailBody emailBody={emailBody} handleMarkAsFavorite={handleMarkAsFavorite} favorites={operations?.favorites}
                selectedEmail={selectedEmail}
              />
            </div>
            :
            null
        }

      </div>
   
    </div>
  );
}

export default Homepage;
