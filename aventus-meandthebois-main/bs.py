#do this to use this file - from bs import bill_info
#create a object of the class bill_info(url) where url is a string of the https link to website
#data = object.scrape() for storing all bills data in variable data 
#sends a array with [ heading , ministry  , status , key points]
#object.show()to print and see them individually 



import requests
from bs4 import BeautifulSoup
import unicodedata
class bill_info:
  def __init__(self,url):
    self.url = url
  def scrape(self):
    global key_points
    global heading
    global ministry
    global status
    global data
    key_points=[]
    heading=[]
    ministry=[]
    status=[]
    data=[]
    html=requests.get(self.url)
    s=BeautifulSoup(html.content,'html.parser')
    key=s.find_all('a',title='PRS Bill Summary')
    for i in key:
      k=i.get('href')
    url2=('https://prsindia.org'+k)
    url2
    html2=requests.get(url2)
    s1=BeautifulSoup(html2.content,'html.parser')
    key1=s1.find(class_='body_content')
    k=key1.find_all('ul')
    if not k:
     k=s.find_all('ul')
     for i in range(3,len(k)-5):
        key_points.append(unicodedata.normalize("NFKD",k[i].get_text(strip='True')))
    elif len(k)==1:
      k=key1.find_all('span',style='font-size:16px')
      if not k:
        k=key1.find_all('span',style='font-family:Times New Roman,Times,serif')
        for i in k:
          key_points.append(unicodedata.normalize("NFKD",i.get_text(strip='True')))
      else:
        for i in k:
          key_points.append(unicodedata.normalize("NFKD",i.get_text(strip='True')))
    else:
      k=key1.find_all('span',style='font-family:Times New Roman,Times,serif')
      if  k:
       for i in k:
         key_points.append(unicodedata.normalize("NFKD",i.get_text(strip='True')))
      else:
       k=key1.find_all('span',style='font-family:"Times New Roman",serif')
       for i in k:
         key_points.append(unicodedata.normalize("NFKD",i.get_text(strip='True')))
    head=s.find_all('a',class_='active fs-28')
    for i in head:
      heading.append(unicodedata.normalize("NFKD",i.get_text(strip='True')))
    mini=s.find('div',class_='field field-name-field-ministry field-type-taxonomy-term-reference field-label-inline clearfix')
    if mini:
        for i in mini:
         ministry.append(unicodedata.normalize("NFKD",i.get_text(strip='True')))
        ministry=ministry[3]  
    else:
         ministry.append('None')
         ministry=ministry[0]
    stat=s.find_all('div',class_='field field-name-field-own-status field-type-list-text field-label-hidden')
    if stat:
        for i in stat:
          status.append(unicodedata.normalize("NFKD",i.get_text(strip='True')))
    else:
        status.append('Unkown')
    data=[heading[0],ministry,status[len(status)-1],key_points[:len(key_points)-1]]
    return data


  def show(self):
    print('\n heading : \n\n'+heading[0])
    print('\n KEY POINTS : \n')
    for i in range(len(key_points)-1):
      print(key_points[i]+'\n')
    print('\n ministry : \n\n'+ministry+'\n\n')
    print(' status : \n')
    if status[len(status)-1]=='Passed':
      print('Passed')
    else:
     print('Pending')