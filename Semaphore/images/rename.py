import os

# Dictionary mapping old names to new names
name_mapping = {
    'Semaphore_Alpha': 'Alp',
    'Semaphore_Bravo': 'Bra',
    'Semaphore_Charlie': 'Cha',
    'Semaphore_Delta': 'Del',
    'Semaphore_Echo': 'Ech',
    'Semaphore_Foxtrot': 'Fox',
    'Semaphore_Golf': 'Gol',
    'Semaphore_Hotel': 'Hot',
    'Semaphore_India': 'Ind',
    'Semaphore_Juliett': 'Jul',
    'Semaphore_Kilo': 'Kil',
    'Semaphore_Lima': 'Lim',
    'Semaphore_Mike': 'Mik',
    'Semaphore_November': 'Nov',
    'Semaphore_Oscar': 'Osc',
    'Semaphore_Papa': 'Pap',
    'Semaphore_Quebec': 'Que',
    'Semaphore_Romeo': 'Rom',
    'Semaphore_Sierra': 'Sie',
    'Semaphore_Tango': 'Tan',
    'Semaphore_Uniform': 'Uni',
    'Semaphore_Victor': 'Vic',
    'Semaphore_Whiskey': 'Whi',
    'Semaphore_X-ray': 'Xra',
    'Semaphore_Yankee': 'Yan',
    'Semaphore_Zulu': 'Zul',
    'Semaphore_Ready': 'Rea'
}

# Change the current working directory to the script's location
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

# Iterate over all files in the current directory
for filename in os.listdir('.'):
    if filename.endswith('.png'):
        for old_name, new_name in name_mapping.items():
            if old_name in filename:
                new_filename = filename.replace(old_name, new_name)
                os.rename(filename, new_filename)
                print(f'Renamed: {filename} -> {new_filename}')
                break

print("File renaming complete.")
