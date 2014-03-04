
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.status(200);
  res.render('index', { title: 'L\'officiel des sorties' });
};

exports.mes_evenements = function(req, res){
  res.status(200);
  res.render('mes_evenements', { title: 'Mes événéments | L\'officiel des sorties' });
};

exports.mon_compte = function(req, res){
  res.status(200);
  res.render('mon_compte', { title: 'Mon compte | L\'officiel des sorties' });
};