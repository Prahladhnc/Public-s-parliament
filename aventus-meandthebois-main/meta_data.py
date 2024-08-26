from bs import bill_info
from summarizer_model import summarize
import requests
from bs4 import BeautifulSoup
url='https://prsindia.org/billtrack/category/all'
html=requests.get(url)
s=BeautifulSoup(html.content,'html.parser')
# print(s.prettify())\
mega_data=[]
n=0
key=s.find_all('div' ,class_="views-row")
for i in key:
  if(n<19):
    key2=i.find('a')
    link='https://prsindia.org'+ key2.get('href')
    key3=i.find('span' ,class_="status-pending")
    stat=key3.get_text(strip='True')
    if(stat=='Pending'):
      bill=bill_info(link)
      mega_data.append(bill.scrape())
      n+=1
print(mega_data[1])
  #THIS down here is for summary code

