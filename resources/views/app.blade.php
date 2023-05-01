<!DOCTYPE html>
<html data-theme="corporate">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>window.Laravel = { csrfToken: '{{ csrf_token() }}' }</script>
    @routes
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @vite('resources/css/app.css')
    @inertiaHead
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
</head>

<body>

    @inertia

</body>

</html>
