# Cách dùng boilerplate

## Có sẵn các thư viện

- tailwind

## Chưa có / TODO

- bootstrap
- glide (slider)
- xóa comment css, uglify css
- uglify js

## Cách dùng

- Viết code chung chung vào thư mục: project/source/main
  - css tống hết vào nhiều file .scss trong /css, rồi bot gộp hết lại thành 1 file và chuyển sang project/render/style.css
  - html thì viết kiểu ejs vào /ejs, bot tự tìm tất cả file ejs trong /ejs, trừ thư mục /ejs/parts, rồi convert sang file .html với tên giống tên file .ejs tương ứng, ném vào thư mục project/render/
  - tất cả js trong /js sẽ bị gộp hết vào 1 file trong project/render/script.js
- Viết code vào <head>
  - viết config vào /ejs/parts/header.ejs vì dùng cdn tailwind script, nên phải link cdn và script phụ thêm cho tailwind vào <head>
  - Link Google fonts vào head
- Chạy lệnh `npm run whilecode` để nó render ra html với css bình thường ra thư mục project/render
- Khi code xong, chạy lệnh `npm run aftercode` để nó purge css và thêm autoprefixer, input lấy từ fle project/render/style.css và sửa lên chính file đó.
