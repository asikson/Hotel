from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
import time
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select
import pandas as pd
chrome_options = Options()
chrome_options.add_argument("--disable-web-security")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--remote-debugging-port=9222")

all_times = []





# Tworzymy nową przeglądarkę
driver = webdriver.Chrome(chrome_options=chrome_options)
driver.get("http://localhost:3000/")
wait = WebDriverWait(driver, 10)

# Szukamy pola do wpisywania
driver.find_element(By.ID, ":r0:").send_keys("Werka")


# Szukamy pola do wpisywania
driver.find_element(By.ID, ":r1:").send_keys("Werka")


# znajdujemy przycisk po jego tag name
driver.find_element(By.TAG_NAME,"button").click()

wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Rezerwacje']"))).click()
driver.find_element(By.XPATH, "//button[@value='conference']").click()
for _ in range(10): 
    number = 10
    date = str(number) + "/01/2023"
    a = []
    people = 100
    while people!=210:
        driver.find_element(By.XPATH, "(//button[text()='Dodaj'])[1]").click()
        driver.find_element(By.XPATH, "(//input)[1]").send_keys(date)
        driver.find_element(By.XPATH, "(//input)[2]").send_keys(date)
        driver.find_element(By.XPATH, "(//input)[3]").send_keys(people)
        driver.find_element(By.XPATH, "(//div[@role='button'])[1]").click()
        driver.find_element(By.XPATH, "(//li)[1]").click()
        driver.find_element(By.XPATH, "(//div[@role='button'])[2]").click()
        driver.find_element(By.XPATH, "(//li)[1]").click()
        driver.find_element(By.XPATH, "(//div[@role='button'])[3]").click()
        driver.find_element(By.XPATH, "(//li)[1]").click()
        driver.find_element(By.XPATH, "(//button[text()='Dodaj'])[2]").click()
        start = time.time()
        wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Zatwierdź']"))).click()
        end = time.time()
        a.append(end - start)
        people = people + 10
        number = number + 1
        date = str(number) + "/01/2023"
    b = sum(a)/len(a)
    with open('algorithm.csv', 'a') as f:
        f.write("tablica czasów: " + a + ", ")
    with open('algorithm.csv', 'a') as f:
        f.write("uśredniona wartość: " + b + ", ")
    all_times.append(a)
df = pd.DataFrame(all_times)
aver_time = df.mean()
with open('algorithm.csv', 'a') as f:
    f.write("uśredniona wartość wszystkich tablic: " + aver_time + ", ")
b = sum(aver_time)/len(aver_time)
print("uśredniona wartość wszytskich: ", b)
