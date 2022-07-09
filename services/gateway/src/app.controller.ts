import { ProductService } from './products/product.service';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // @Get()
  // async getHello2() {
  //   return this.appService.getHello();
  // }

  // goog thing
  @Get()
  async getHello22(@Req() req  ) {
    console.log({sess:req.session});
    
    if (req.session.views) {
      req.session.views++
      //     res.setHeader('Content-Type', 'text/html')
      // res.write('<p>views: ' + req.session.views + '</p>')
      // res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      // res.end()
      return 'views: ' + req.session.views + ' mo'
  } else {
      console.log(8836);
      req.session.views = 1
   return 'welcome to the session demo. refresh!'
  }
   
  }
  @Post('u54545545afsahjkrewuirewqttgyppp')
  async addMany(@Body() data) {
    return this.appService.addProds(data.products);
  }
  @Post('jlkhj897987gs789kjhjkhjkhjkhhh')
  async addMany2(@Body() data) {
    return this.appService.addOffers(data.offers);
  }

//   app.get('/', function(req, res, next) {

//     if (req.session.views) {
//         req.session.views++
//             res.setHeader('Content-Type', 'text/html')
//         res.write('<p>views: ' + req.session.views + '</p>')
//         res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//         res.end()
//     } else {
//         console.log(88);
//         req.session.views = 1
//         res.end('welcome to the session demo. refresh!')
//     }
// })
  // @Get('/.*!graphql$/')
  // //^(?!\/api|\/auth).+
  // async getHello3() {
  //   console.log('gg');
    
  //   return this.appService.getHello();
  // }
}
