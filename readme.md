# Cách dùng boilerplate

## Có sẵn các thư viện

- tailwind

## Chưa có / TODO

- bootstrap
- font-awesome
- glide (slider)
- xóa comment css, uglify css
- kết hợp file js lại, uglify js
- dev enviroment

## Cách dùng

- Viết code vào thư mục: project/source
  - css tống hết vào nhiều file .scss trong project/source/css, rồi bot gộp hết lại thành 1 file và chuyển sang project/render/style.css
  - html thì viết kiểu ejs vào project/source/ejs, bot tự tìm tất cả file ejs trong project/source/ejs, trừ thư mục project/source/ejs/parts, rồi convert sang file .html với tên giống tên file .ejs tương ứng, ném vào thư mục project/render/
  - tất cả js trong project/source/js sẽ bị gộp hết vào 1 file trong project/render/script.js
- Viết code vào <head>
  - viết config vào project/source/ejs/parts/header.ejs vì dùng cdn tailwind script, nên phải link cdn và script phụ thêm cho tailwind vào <head>
  - Link Google fonts vào head
- Chạy lệnh `npm run whilecode` để nó render ra html với css bình thường ra thư mục project/render
- Khi code xong, chạy lệnh `npm run aftercode` để nó purge css và thêm autoprefixer, input lấy từ fle project/render/style.css và sửa lên chính file đó.
