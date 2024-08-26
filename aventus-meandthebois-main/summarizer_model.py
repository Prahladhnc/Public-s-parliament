from transformers import AutoModelWithLMHead, AutoTokenizer
from transformers import pipeline
class summarize:
    def _init_(self,text,sum_index):
        self.text=text
        self.sum_index=sum_index       
    def get(self):
        num=len(self.text.split())
        mid=round(num*self.sum_index)
        low=round(mid-0.1*mid)
        high=round(mid+0.1*mid)
        summarizer = pipeline("summarization")
        return summarizer(self.text, max_length=high, min_length=low, do_sample=False)[0]['summary_text']