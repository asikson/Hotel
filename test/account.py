from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
import time
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select
import pandas as pd
import random


chrome_options = Options()
chrome_options.add_argument("--disable-web-security")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--remote-debugging-port=9222")


all_times = []


def check_ajax_complete(driver):
    return driver.execute_script("return document.readyState") == "complete"


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

wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Panel administratora']"))).click()
wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Zarządzaj pokojami']"))).click()
wait.until(EC.element_to_be_clickable((By.XPATH, "(//button[text()='Dodaj'])[1]")))
for i in range(1, 60):
    driver.find_element(By.XPATH, "(//button[text()='Dodaj'])[1]").click()
    driver.find_element(By.XPATH, "(//input)[1]").send_keys("room"+str(i))
    driver.find_element(By.XPATH, "(//input)[2]").send_keys(random.randint(10,15))
    driver.find_element(By.XPATH, "(//input)[3]").send_keys(random.randint(100,500))
    driver.find_element(By.XPATH, "(//input)[4]").send_keys(random.randint(10,50))
    driver.find_element(By.XPATH, "(//div[@role='button'])[1]").click()
    driver.find_element(By.XPATH, "(//li)[1]").click()
    driver.find_element(By.XPATH, "(//button[text()='Dodaj'])[2]").click()
    start = time.time()
    while not check_ajax_complete(driver):
        pass
    stop = time.time()
    end = stop - start
    all_times.append(end)
    time.sleep(0.5)

print(sum(all_times)/len(all_times))
print(all_times)
with open('account.csv', 'w') as f:
    f.write(all_times)

