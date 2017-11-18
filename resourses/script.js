var r = new Resumable({
    target: 'server.php',
    testChunks: true
});

if(!r.support){
    alert('Your browser is not supported. ');
}

r.assignBrowse(document.getElementById('add-file-btn'));

$('#start-upload-btn').click(function(){
    console.log('start-upload-btn');
    r.upload();
});

$('#pause-upload-btn').click(function(){
    console.log('pause-upload-btn');

    if (r.files.length>0) {
        if (r.isUploading()) {
            return  r.pause();
        }
        return r.upload();
    }
});

var progressBar = new ProgressBar($('#upload-progress'));

r.on('fileAdded', function(file, event){
    progressBar.fileAdded();

    console.log('fileAdded');
    $('.alert-success').addClass('hide');

});

r.on('fileSuccess', function(file, message){
    progressBar.finish();

    console.log('fileSuccess');
    $('.alert-success').removeClass('hide');
});

r.on('progress', function(){
    console.log(r.progress());

    progressBar.uploading(r.progress()*100);
    $('#pause-upload-btn').find('.glyphicon').removeClass('glyphicon-play').addClass('glyphicon-pause');
});

r.on('pause', function(){
    console.log('pause');

    $('#pause-upload-btn').find('.glyphicon').removeClass('glyphicon-pause').addClass('glyphicon-play');
});

function ProgressBar(ele) {
    this.thisEle = $(ele);

    this.fileAdded = function() {
        (this.thisEle).removeClass('hide').find('.progress-bar').css('width','0%');
        $('.alert-success').hide();
    },

        this.uploading = function(progress) {
            (this.thisEle).find('.progress-bar').attr('style', "width:"+progress+'%');
        },

        this.finish = function() {
            (this.thisEle).addClass('hide').find('.progress-bar').css('width','0%');
            $('.alert-success').show();
        }
}