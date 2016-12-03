

module.exports = function(app, path, fs, mediaserver, multer, express){

	

	app.get('/admin', function(req, res) {
		// Render views/indexAngular.html
		res.render('indexAdmin');
	});

	app.get('/', function(req, res) {
		// Render views/indexAngular.html
		res.render('indexAngular');
	});

	
	var opcionesMulter = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,  path.join(__dirname, 'canciones')); //donde guardo el archivo

  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: opcionesMulter});



app.use(express.static('public'));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));




app.get('/canciones',function(req,res){
  fs.readFile(path.join(__dirname, 'canciones.json'), 'utf8', function(err, canciones){
    if (err) throw err;
    res.json(JSON.parse(canciones)) ;
  })
});

app.get('/canciones/:nombre', function(req, res){
  var cancion = path.join(__dirname, 'canciones', req.params.nombre);
  console.log(req.params.nombre);
  mediaserver.pipe (req, res, cancion);
})



app.post('/canciones', upload.single('cancion'), function(req, res){
  var archivoCanciones = path.join(__dirname, 'canciones.json');
  var nombre = req.file.originalname;
  fs.readFile(archivoCanciones, 'utf8', function(err, archivo){
    if (err) throw err;
    var canciones = JSON.parse(archivo);
    canciones.push({nombre: nombre});


    fs.writeFile(archivoCanciones, JSON.stringify(canciones), function(err){
      if (err) throw err;
      res.sendFile(path.join(__dirname, '/views/indexAdmin.html'));
    })
  });
});

	
};

