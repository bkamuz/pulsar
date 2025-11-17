// _converter.js
const fs = require('fs');
const path = require('path');

// Папка назначения для StrudelDirt
const targetBase = path.resolve('./.samples');

// Путь к strudel.json (в текущей директории)
const jsonPath = path.resolve('./samples/strudel.json');

// Проверяем наличие файла
if (!fs.existsSync(jsonPath)) {
    console.error('strudel.json не найден по пути:', jsonPath);
    process.exit(1);
}

// Создаем папку назначения
if (!fs.existsSync(targetBase)) fs.mkdirSync(targetBase, { recursive: true });

// Читаем strudel.json
const raw = fs.readFileSync(jsonPath, 'utf8');
const json = JSON.parse(raw);

// Функция копирования с проверкой
function copyFile(srcPath, destPath) {
    if (!fs.existsSync(srcPath)) {
        console.warn('Файл не найден, пропускаем:', srcPath);
        return;
    }
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(srcPath, destPath);
}

// Проходим по всем ключам в strudel.json
for (const [name, val] of Object.entries(json)) {
    if (name === '_base') continue;

    const samples = Array.isArray(val) ? val : [val];

    samples.forEach((file, index) => {
        // Убираем ведущий слэш, если есть, чтобы путь был относительным
        const normalizedFile = file.startsWith('/') ? file.slice(1) : file;
        // Берем путь относительно папки samples
        const srcPath = path.resolve('./samples', normalizedFile); 
        const ext = path.extname(file);
        const destPath = path.join(targetBase, name, `${index}${ext}`);
        copyFile(srcPath, destPath);
    });
}

console.log('Сэмплы подготовлены для StrudelDirt в папке', targetBase);
