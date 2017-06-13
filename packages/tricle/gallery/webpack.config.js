module.exports = [

    {
        entry: {
            "slideshow": "./app/views/slideshow", //fake
            "gallery-edit": "./app/views/admin/gallery-edit",
            "gallery-index": "./app/views/admin/gallery-index",
            "editor-plugin": "./app/views/admin/editor-plugin",
            "gallery-dashboard": "./app/components/gallery-dashboard.vue",
            "settings": "./app/views/admin/settings",
            "link-gallery": "./app/components/link-gallery.vue",
            "gallery-meta": "./app/components/gallery-meta.vue",
            "gallery-images": "./app/components/gallery-images.vue"

        },
        output: {
            filename: "./app/bundle/[name].js"
        },
        module: {
            loaders: [
                { test: /\.vue$/, loader: "vue" }
            ]
        }
    }

];
