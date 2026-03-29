const fs = require('fs');
const path = require('path');

class FileRepository {
  constructor(filePath) {
    this.filePath = filePath;

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '');
    }
  }

  readRaw() {
    return fs.readFileSync(this.filePath, 'utf-8');
  }

  writeRaw(content) {
    fs.writeFileSync(this.filePath, content, 'utf-8');
  }

  parseCSV(content) {
    if (!content.trim()) return [];

    const lines = content.trim().split('\n');
    const headers = this.parseCSVLine(lines[0]);

    return lines.slice(1).map((line) => {
      const values = this.parseCSVLine(line);
      const item = {};

      headers.forEach((header, index) => {
        item[header] = values[index] ?? '';
      });

      return item;
    });
  }

  parseCSVLine(line) {
    const result = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          current += '"';
          i += 1;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current);
    return result;
  }

  stringifyCSV(items) {
    if (!items.length) return '';

    const headers = Object.keys(items[0]);
    const headerLine = headers.join(',');

    const rows = items.map((item) =>
      headers
        .map((header) => this.escapeCSVValue(item[header]))
        .join(',')
    );

    return [headerLine, ...rows].join('\n');
  }

  escapeCSVValue(value) {
    const stringValue = value === undefined || value === null ? '' : String(value);

    if (
      stringValue.includes(',') ||
      stringValue.includes('"') ||
      stringValue.includes('\n')
    ) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
  }

  getAll() {
    const content = this.readRaw();
    return this.parseCSV(content);
  }

  getById(id) {
    return this.getAll().find((item) => String(item.id) === String(id)) || null;
  }

  save(items) {
    const csv = this.stringifyCSV(items);
    this.writeRaw(csv);
  }
}

module.exports = FileRepository;