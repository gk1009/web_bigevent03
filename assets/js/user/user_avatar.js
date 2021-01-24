$(function () {
    var layer = layui.layer
    var $image = $('#image')
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }

    $image.cropper(options)
    $('#btnChooseImage').on('click', function () {
        $("#file").click()
    })

    $('#file').on('change', function (e) {
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择图片')
        }
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options)
    })
    $("#btnUpload").on('click', function () {
        //base64
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            // 转化为 base64 格式的字符串
            .toDataURL('image/png')
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换成功')
                window.parent.getUserInfo()
            }
        })
    })
})