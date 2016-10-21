<div class="copyright" >
  {% set current = date(Date.now(), "YYYY") %}
  &copy; {% if theme.since and theme.since != current %} {{ theme.since }} - {% endif %}
  <span itemprop="copyrightYear">{{ current }}</span>
  <span class="with-love">
    <i class="fa fa-fw fa-github"></i>
  </span>
  <span class="author" itemprop="copyrightHolder"><a class="hosted-link" href="{{ config.root }}">{{ config.author }}</a></span>
</div>

<div class="hosted-on">
    Hosted on <a class="hosted-link" href="{{ config.repository }}"><i class="fa fa-fw fa-github"></i>GitHub</a>
</div>
