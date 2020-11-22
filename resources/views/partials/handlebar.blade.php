<script id="template" type="text/x-handlebars-template">  

    <div class="carousel-item  @{{active}} @{{first}}">
    
        <div class ="forecast-card d-block w-100">
          <div class="today"> <span>today</span> </div>
          
          <h3 class="title text-center">@{{{country}}} @{{{region}}}  @{{{city}}} </h3>
          
          <img class="forecast_card_img" src="http:@{{{day.condition.icon}}}" alt="@{{{icon}}}">
          <div class="card-text-info">
            <div class="card-text-transition">
              <h3 class="dayname">@{{{dayname}}}</h3>
              <h4 class="date_d">@{{{date}}}</h4>
              <div class="max_temp">Max : @{{{day.maxtemp_c}}}&#8451;</div>
              <div class="min_temp">Min :  @{{{day.mintemp_c}}}&#8451;</div>
              <h5 class="condition_text_d">@{{{day.condition.text}}}</h5>
            </div>
          </div>
        </div> 
     </div> 
      
    </script>
